// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/AxoloAccess.sol";
import "../src/AxoloRegistry.sol";

contract MockEAS {
    uint256 private _uid;

    fallback(bytes calldata) external payable returns (bytes memory) {
        _uid++;
        return abi.encode(bytes32(_uid));
    }
}

contract AxoloIntegrationTest is Test {
    AxoloAccess access;
    AxoloRegistry registry;

    bytes4 constant ACCESS_CONTROL_UNAUTHORIZED_SELECTOR =
        bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)"));

    bytes32 constant PHOTO_HASH = keccak256("photo_ipfs_cid");
    uint256 constant BIRTH_DATE = 1_700_000_000;

    address admin = makeAddr("admin");
    address managerA = makeAddr("managerA");
    address managerB = makeAddr("managerB");
    address caretakerUser = makeAddr("caretakerUser");
    address auditorUser = makeAddr("auditorUser");
    address outsider = makeAddr("outsider");
    address resolverAddr = makeAddr("resolver");
    address forwarder = makeAddr("forwarder");

    function setUp() public {
        vm.startPrank(admin);

        access = new AxoloAccess(forwarder);

        registry = new AxoloRegistry(
            address(access),
            address(new MockEAS()),
            keccak256("tankSchema"),
            keccak256("axolotlSchema"),
            keccak256("transferSchema"),
            keccak256("deactivateSchema"),
            forwarder
        );

        vm.stopPrank();
    }

    function _institutionNode(string memory labelInst) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(access.AXOLODAO_NODE(), keccak256(bytes(labelInst))));
    }

    function _userNode(bytes32 parentNode, string memory userLabel) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(parentNode, keccak256(bytes(userLabel))));
    }

    function _mockSetSubnodeOwner(string memory labelInst, address manager) internal {
        bytes32 labelHash = keccak256(bytes(labelInst));
        bytes32 node = _institutionNode(labelInst);

        vm.mockCall(
            access.ENS_REGISTRY(),
            abi.encodeWithSelector(
                IENSRegistry.setSubnodeOwner.selector,
                access.AXOLODAO_NODE(),
                labelHash,
                manager
            ),
            abi.encode(node)
        );
    }

    function _addInstitutionAsAdmin(
        string memory labelInst,
        bytes32 role,
        address manager
    ) internal returns (bytes32) {
        _mockSetSubnodeOwner(labelInst, manager);

        vm.startPrank(admin);
        access.adicionarInstituicao(labelInst, role, manager);
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

    function test_integration_endToEndCaretakerInstitutionCanRegisterTankAndAxolotl() public {
        bytes32 parentNode = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);

        _registerAccess(caretakerUser, "alice", parentNode);

        assertTrue(access.hasRole(access.CARETAKER_ROLE(), caretakerUser));
        assertEq(access.ensName(caretakerUser), "alice.biomuseu.axolodao2.eth");

        vm.startPrank(caretakerUser);
        uint256 tankId = registry.registerTank("Tanque 01", "Laboratorio A");
        uint256 axolotlId = registry.registerAxolotl(
            "Luna",
            "Ambystoma mexicanum",
            BIRTH_DATE,
            tankId,
            "18cm, leucistico",
            PHOTO_HASH
        );
        vm.stopPrank();

        AxoloRegistry.Tank memory t = registry.getTank(tankId);
        AxoloRegistry.Axolotl memory a = registry.getAxolotl(axolotlId);

        assertEq(t.registeredBy, caretakerUser);
        assertEq(a.registeredBy, caretakerUser);
        assertEq(a.tankId, tankId);

        uint256[] memory list = registry.getAxolotlsInTank(tankId);
        assertEq(list.length, 1);
        assertEq(list[0], axolotlId);
    }

    function test_integration_auditorInstitutionGetsRoleButCannotRegisterTank() public {
        bytes32 parentNode = _addInstitutionAsAdmin("ufabc", access.AUDITOR_ROLE(), managerB);

        _registerAccess(auditorUser, "bob", parentNode);

        assertTrue(access.hasRole(access.AUDITOR_ROLE(), auditorUser));
        assertFalse(access.hasRole(access.CARETAKER_ROLE(), auditorUser));

        vm.prank(auditorUser);
        vm.expectRevert("AxoloRegistry: caller is not a caretaker");
        registry.registerTank("Tanque Auditor", "Sala 2");
    }

    function test_integration_userWithoutEnsAccessCannotOperateButCanAfterRegistrarAcesso() public {
        bytes32 parentNode = _addInstitutionAsAdmin("zoolab", access.CARETAKER_ROLE(), managerA);

        vm.prank(caretakerUser);
        vm.expectRevert("AxoloRegistry: caller is not a caretaker");
        registry.registerTank("Tanque Bloqueado", "Sala 3");

        _registerAccess(caretakerUser, "carol", parentNode);

        vm.prank(caretakerUser);
        uint256 tankId = registry.registerTank("Tanque Liberado", "Sala 3");

        AxoloRegistry.Tank memory t = registry.getTank(tankId);
        assertEq(t.registeredBy, caretakerUser);
    }

    function test_integration_nonAdminCannotCreateInstitutionAndFlowDoesNotStart() public {
        bytes32 adminRole = access.DEFAULT_ADMIN_ROLE();
        bytes32 caretakerRole = access.CARETAKER_ROLE();

        vm.prank(outsider);
        vm.expectRevert(
            abi.encodeWithSelector(ACCESS_CONTROL_UNAUTHORIZED_SELECTOR, outsider, adminRole)
        );
        access.adicionarInstituicao("ilegal", caretakerRole, managerA);

        bytes32 parentNode = _institutionNode("ilegal");

        vm.prank(caretakerUser);
        vm.expectRevert("ENS: dominio pai nao e uma instituicao reconhecida ou esta inativa");
        access.registrarAcesso("dave", parentNode);
    }

    function test_integration_revokedInstitutionBlocksNewAccessButKeepsGrantedRole() public {
        bytes32 parentNode = _addInstitutionAsAdmin("biopark", access.CARETAKER_ROLE(), managerA);

        _registerAccess(caretakerUser, "eve", parentNode);
        assertTrue(access.hasRole(access.CARETAKER_ROLE(), caretakerUser));

        vm.prank(admin);
        access.removerInstituicao(parentNode);

        vm.prank(caretakerUser);
        uint256 tankId = registry.registerTank("Tanque PosRevogacao", "Sala 4");
        assertEq(registry.getTank(tankId).registeredBy, caretakerUser);

        vm.prank(auditorUser);
        vm.expectRevert("ENS: dominio pai nao e uma instituicao reconhecida ou esta inativa");
        access.registrarAcesso("frank", parentNode);
    }
}
