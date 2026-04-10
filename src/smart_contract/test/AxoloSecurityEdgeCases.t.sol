// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/AxoloAccess.sol";
import "../src/AxoloRegistry.sol";
import "../src/AxoloMonitoring.sol";

contract MockEASSecurity {
    uint256 private _uid;

    fallback(bytes calldata) external payable returns (bytes memory) {
        _uid++;
        return abi.encode(bytes32(_uid));
    }
}

contract AxoloSecurityEdgeCasesTest is Test {
    AxoloAccess access;
    AxoloRegistry registry;
    AxoloMonitoring monitoring;

    address admin = makeAddr("admin");
    address manager = makeAddr("manager");
    address memberOld = makeAddr("memberOld");
    address memberNew = makeAddr("memberNew");
    address caretaker = makeAddr("caretaker");
    address auditor = makeAddr("auditor");
    address outsider = makeAddr("outsider");
    address resolverAddr = makeAddr("resolver");
    address forwarder = makeAddr("forwarder");

    bytes32 constant PHOTO_HASH = keccak256("photo_ipfs_cid");
    uint256 constant BIRTH_DATE = 1_700_000_000;

    function setUp() public {
        vm.startPrank(admin);

        access = new AxoloAccess(forwarder);

        address mockEas = address(new MockEASSecurity());

        registry = new AxoloRegistry(
            address(access),
            mockEas,
            keccak256("tankSchema"),
            keccak256("axolotlSchema"),
            keccak256("transferSchema"),
            keccak256("deactivateSchema"),
            forwarder
        );

        monitoring = new AxoloMonitoring(
            address(access),
            address(registry),
            mockEas,
            keccak256("measurementSchema"),
            forwarder
        );

        access.grantRole(access.CARETAKER_ROLE(), caretaker);
        access.grantRole(access.AUDITOR_ROLE(), auditor);

        vm.stopPrank();
    }

    function _institutionNode(string memory labelInst) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(access.AXOLODAO_NODE(), keccak256(bytes(labelInst))));
    }

    function _userNode(bytes32 parentNode, string memory userLabel) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(parentNode, keccak256(bytes(userLabel))));
    }

    function _mockSetSubnodeOwner(string memory labelInst, address institutionManager) internal {
        bytes32 labelHash = keccak256(bytes(labelInst));
        bytes32 node = _institutionNode(labelInst);

        vm.mockCall(
            access.ENS_REGISTRY(),
            abi.encodeWithSelector(
                IENSRegistry.setSubnodeOwner.selector,
                access.AXOLODAO_NODE(),
                labelHash,
                institutionManager
            ),
            abi.encode(node)
        );
    }

    function _addInstitutionAsAdmin(
        string memory labelInst,
        bytes32 role,
        address institutionManager
    ) internal returns (bytes32) {
        _mockSetSubnodeOwner(labelInst, institutionManager);

        vm.startPrank(admin);
        access.adicionarInstituicao(labelInst, role, institutionManager);
        vm.stopPrank();

        return _institutionNode(labelInst);
    }

    function _mockEnsResolution(bytes32 node, address account) internal {
        vm.mockCall(
            access.ENS_REGISTRY(),
            abi.encodeWithSelector(IENSRegistry.resolver.selector, node),
            abi.encode(resolverAddr)
        );

        vm.mockCall(
            resolverAddr,
            abi.encodeWithSelector(IENSResolver.addr.selector, node),
            abi.encode(account)
        );
    }

    function _registerAccess(address account, string memory userLabel, bytes32 parentNode) internal {
        bytes32 node = _userNode(parentNode, userLabel);
        _mockEnsResolution(node, account);

        vm.prank(account);
        access.registrarAcesso(userLabel, parentNode);
    }

    function _params(uint256 tankId)
        internal
        pure
        returns (AxoloMonitoring.MeasurementParams memory)
    {
        return AxoloMonitoring.MeasurementParams({
            tankId: tankId,
            temperature: 1850,
            ph: 723,
            dissolvedOxygen: 850,
            conductivity: 30000,
            turbidity: 50,
            phosphates: 25,
            no2: 10,
            no3: 400,
            ammonia: 5,
            hardness: 18000
        });
    }

    function _populateTank(uint256 tankId, uint256 total, bool leaveLastActive) internal {
        vm.startPrank(caretaker);
        for (uint256 i = 0; i < total; i++) {
            uint256 axId = registry.registerAxolotl(
                "Xolotl",
                "Ambystoma mexicanum",
                BIRTH_DATE,
                tankId,
                "morph",
                PHOTO_HASH
            );

            if (!leaveLastActive || i + 1 < total) {
                registry.deactivateAxolotl(axId);
            }
        }
        vm.stopPrank();
    }

    function test_security_rolePermanence_afterEnsOwnershipTransfer() public {
        bytes32 parentNode = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), manager);

        // Primeiro dono ENS registra acesso e recebe role.
        _registerAccess(memberOld, "alice", parentNode);
        assertTrue(access.hasRole(access.CARETAKER_ROLE(), memberOld));

        // Simula transferir ownership ENS para novo dono e novo registro.
        _registerAccess(memberNew, "alice", parentNode);

        // Vulnerabilidade: role antiga permanece mesmo apos mudança de titular ENS.
        assertTrue(access.hasRole(access.CARETAKER_ROLE(), memberOld));
        assertTrue(access.hasRole(access.CARETAKER_ROLE(), memberNew));

        vm.prank(memberOld);
        uint256 tankId = registry.registerTank("Tanque com role herdada", "Sala A");
        assertEq(registry.getTank(tankId).registeredBy, memberOld);
    }

    function test_security_accessDenied_withoutAdequateRole() public {
        vm.prank(outsider);
        vm.expectRevert("AxoloRegistry: caller is not a caretaker");
        registry.registerTank("Tank", "Lab");

        vm.prank(caretaker);
        uint256 tankId = registry.registerTank("Tank", "Lab");

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(outsider);
        vm.expectRevert("AxoloMonitoring: caller is not an auditor");
        monitoring.validateMeasurement(mId);

        vm.prank(outsider);
        vm.expectRevert("AxoloMonitoring: caller is not an auditor");
        monitoring.contestMeasurement(mId, "invalid");
    }

    function test_security_unboundedLoopRisk_deactivateTankGasGrowsWithArraySize() public {
        vm.startPrank(caretaker);
        uint256 smallTankId = registry.registerTank("SmallTank", "L1");
        vm.stopPrank();
        _populateTank(smallTankId, 1, false);

        vm.startPrank(caretaker);
        uint256 gasStartSmall = gasleft();
        registry.deactivateTank(smallTankId);
        uint256 gasUsedSmall = gasStartSmall - gasleft();
        vm.stopPrank();

        vm.startPrank(caretaker);
        uint256 bigTankId = registry.registerTank("BigTank", "L2");
        vm.stopPrank();
        _populateTank(bigTankId, 80, false);

        vm.startPrank(caretaker);
        uint256 gasStartBig = gasleft();
        registry.deactivateTank(bigTankId);
        uint256 gasUsedBig = gasStartBig - gasleft();
        vm.stopPrank();

        assertGt(gasUsedBig, gasUsedSmall);
    }

    function test_security_unboundedLoopRisk_activeItemBlocksDeactivation() public {
        vm.startPrank(caretaker);
        uint256 tankId = registry.registerTank("LoopTank", "L3");
        vm.stopPrank();

        // Deixa o ultimo axolotl ativo para forcar varredura e revert no loop.
        _populateTank(tankId, 60, true);

        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: tank has active axolotls");
        registry.deactivateTank(tankId);
    }
}
