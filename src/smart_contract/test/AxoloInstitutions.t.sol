// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/AxoloAccess.sol";

contract AxoloInstitutionsTest is Test {
    AxoloAccess access;

    bytes4 constant ACCESS_CONTROL_UNAUTHORIZED_SELECTOR =
        bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)"));

    address admin        = makeAddr("admin");
    address managerA     = makeAddr("managerA");
    address managerB     = makeAddr("managerB");
    address user         = makeAddr("user");
    address stranger     = makeAddr("stranger");
    address resolverAddr = makeAddr("resolver");

    function setUp() public {
        vm.startPrank(admin);
        access = new AxoloAccess(makeAddr("forwarder"));
        vm.stopPrank();
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    function _institutionNode(string memory labelInst) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(access.AXOLODAO_NODE(), keccak256(bytes(labelInst))));
    }

    function _userNode(bytes32 parentNode, string memory userLabel) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(parentNode, keccak256(bytes(userLabel))));
    }

    function _mockSetSubnodeOwner(string memory labelInst, address manager) internal {
        bytes32 labelHash = keccak256(bytes(labelInst));
        bytes32 node      = _institutionNode(labelInst);

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

    // -------------------------------------------------------------------------
    // Testes
    // -------------------------------------------------------------------------

    function test_institutions_adminCanCreateInstitution() public {
        bytes32 node = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);

        (bytes32 role, string memory label, bool ativa, address gerente) = access.instituicoes(node);

        assertEq(role, access.CARETAKER_ROLE());
        assertEq(label, "biomuseu");
        assertTrue(ativa);
        assertEq(gerente, managerA);
        assertEq(access.gerentePorNode(node), managerA);
    }

    function test_institutions_nonAdminCannotCreateInstitution() public {
        assertFalse(access.hasRole(access.DEFAULT_ADMIN_ROLE(), stranger));

        // Cacheia roles ANTES de armar o prank/expectRevert.
        // O Foundry conta qualquer call externa após vm.expectRevert como
        // "a próxima call" — incluindo staticcalls de avaliação de argumento.
        bytes32 adminRole   = access.DEFAULT_ADMIN_ROLE();
        bytes32 auditorRole = access.AUDITOR_ROLE();

        vm.prank(stranger);
        vm.expectRevert(
            abi.encodeWithSelector(ACCESS_CONTROL_UNAUTHORIZED_SELECTOR, stranger, adminRole)
        );
        access.adicionarInstituicao("unam", auditorRole, managerB);
    }

    function test_institutions_listByGetterAfterCreatingMultiple() public {
        bytes32 nodeA = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);
        bytes32 nodeB = _addInstitutionAsAdmin("unam",     access.AUDITOR_ROLE(),   managerB);

        (bytes32 roleA, string memory labelA, bool ativaA, address gerenteA) = access.instituicoes(nodeA);
        (bytes32 roleB, string memory labelB, bool ativaB, address gerenteB) = access.instituicoes(nodeB);

        assertEq(roleA, access.CARETAKER_ROLE());
        assertEq(labelA, "biomuseu");
        assertTrue(ativaA);
        assertEq(gerenteA, managerA);

        assertEq(roleB, access.AUDITOR_ROLE());
        assertEq(labelB, "unam");
        assertTrue(ativaB);
        assertEq(gerenteB, managerB);
    }

    function test_institutions_requestAccessFlowAfterAdminApproval() public {
        bytes32 parentNode = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);
        bytes32 node       = _userNode(parentNode, "alice");

        vm.mockCall(
            access.ENS_REGISTRY(),
            abi.encodeWithSelector(IENSRegistry.resolver.selector, node),
            abi.encode(resolverAddr)
        );

        vm.mockCall(
            resolverAddr,
            abi.encodeWithSelector(IENSResolver.addr.selector, node),
            abi.encode(user)
        );

        vm.prank(user);
        access.registrarAcesso("alice", parentNode);

        assertTrue(access.hasRole(access.CARETAKER_ROLE(), user));
        assertEq(access.ensName(user), "alice.biomuseu.axolodao2.eth");
    }

    function test_institutions_requestAccessRevertsBeforeAdminApproval() public {
        bytes32 parentNode = _institutionNode("biomuseu");

        vm.prank(user);
        vm.expectRevert("ENS: dominio pai nao e uma instituicao reconhecida ou esta inativa");
        access.registrarAcesso("alice", parentNode);
    }

    function test_institutions_adminCanRevokeInstitution() public {
        bytes32 node = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);

        vm.prank(admin);
        access.removerInstituicao(node);

        (, , bool ativa, ) = access.instituicoes(node);
        assertFalse(ativa);
    }

    function test_institutions_nonAdminCannotRevokeInstitution() public {
        bytes32 node      = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);
        bytes32 adminRole = access.DEFAULT_ADMIN_ROLE();

        vm.prank(stranger);
        vm.expectRevert(
            abi.encodeWithSelector(ACCESS_CONTROL_UNAUTHORIZED_SELECTOR, stranger, adminRole)
        );
        access.removerInstituicao(node);
    }

    function test_institutions_revokedInstitutionBlocksRequestAccess() public {
        bytes32 parentNode = _addInstitutionAsAdmin("biomuseu", access.CARETAKER_ROLE(), managerA);

        vm.prank(admin);
        access.removerInstituicao(parentNode);

        vm.prank(user);
        vm.expectRevert("ENS: dominio pai nao e uma instituicao reconhecida ou esta inativa");
        access.registrarAcesso("alice", parentNode);
    }

    function test_institutions_cannotCreateDuplicateActiveInstitution() public {
        // Cacheia role ANTES de qualquer prank/expectRevert
        bytes32 caretakerRole = access.CARETAKER_ROLE();

        bytes32 node = _addInstitutionAsAdmin("biomuseu", caretakerRole, managerA);
        (, , bool ativa, ) = access.instituicoes(node);
        assertTrue(ativa);

        // O require de duplicata reverte ANTES da chamada ENS — mock desnecessário
        vm.prank(admin);
        vm.expectRevert("Access: instituicao ja existe e esta ativa");
        access.adicionarInstituicao("biomuseu", caretakerRole, managerA);
    }
}
