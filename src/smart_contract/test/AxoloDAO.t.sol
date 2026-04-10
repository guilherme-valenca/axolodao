// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/AxoloAccess.sol";
import "../src/AxoloRegistry.sol";
import "../src/AxoloMonitoring.sol";

// Mock do EAS: responde qualquer call retornando um bytes32 incremental.
contract MockEAS {
    uint256 private _uid;

    fallback(bytes calldata) external payable returns (bytes memory) {
        _uid++;
        return abi.encode(bytes32(_uid));
    }
}

contract AxoloDAOTest is Test {

    // ─── Contracts ────────────────────────────────────────────────────────
    AxoloAccess     access;
    AxoloRegistry   registry;
    AxoloMonitoring monitoring;

    // ─── Actors ───────────────────────────────────────────────────────────
    address admin     = makeAddr("admin");      // deployer / DEFAULT_ADMIN_ROLE
    address caretaker = makeAddr("caretaker");  // CARETAKER_ROLE
    address auditor   = makeAddr("auditor");    // AUDITOR_ROLE
    address stranger  = makeAddr("stranger");   // no role

    // ─── Helpers ──────────────────────────────────────────────────────────

    bytes32 constant PHOTO_HASH = keccak256("photo_ipfs_cid");
    uint256 constant BIRTH_DATE = 1_700_000_000;

    function _params(uint256 tankId)
        internal pure returns (AxoloMonitoring.MeasurementParams memory)
    {
        return AxoloMonitoring.MeasurementParams({
            tankId:          tankId,
            temperature:     1850,
            ph:              723,
            dissolvedOxygen: 850,
            conductivity:    30000,
            turbidity:       50,
            phosphates:      25,
            no2:             10,
            no3:             400,
            ammonia:         5,
            hardness:        18000
        });
    }

    // Registers tank 1 and axolotl 1 as the caretaker — used in most tests.
    function _setupTankAndAxolotl() internal returns (uint256 tankId, uint256 axolotlId) {
        vm.startPrank(caretaker);
        tankId = registry.registerTank("Tanque Principal", "Sala B");
        axolotlId = registry.registerAxolotl(
            "Xolotl",
            "Ambystoma mexicanum",
            BIRTH_DATE,
            tankId,
            "20cm, 80g, leucistico",
            PHOTO_HASH
        );
        vm.stopPrank();
    }

    // ─── Setup ────────────────────────────────────────────────────────────

    function setUp() public {
        vm.startPrank(admin);

        address forwarder = makeAddr("forwarder");
        address mockEas   = address(new MockEAS());

        bytes32 tankSchema        = keccak256("tankSchema");
        bytes32 axolotlSchema     = keccak256("axolotlSchema");
        bytes32 transferSchema    = keccak256("transferSchema");
        bytes32 deactivateSchema  = keccak256("deactivateSchema");
        bytes32 measurementSchema = keccak256("measurementSchema");

        access = new AxoloAccess(forwarder);

        registry = new AxoloRegistry(
            address(access),
            mockEas,
            tankSchema,
            axolotlSchema,
            transferSchema,
            deactivateSchema,
            forwarder
        );

        monitoring = new AxoloMonitoring(
            address(access),
            address(registry),
            mockEas,
            measurementSchema,
            forwarder
        );

        // Grant roles
        access.grantRole(access.CARETAKER_ROLE(), caretaker);
        access.grantRole(access.AUDITOR_ROLE(),   auditor);

        vm.stopPrank();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 1 — AxoloAccess: role management
    // ═══════════════════════════════════════════════════════════════════════

    function test_access_rolesGrantedCorrectly() public view {
        assertTrue(access.hasRole(access.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(access.hasRole(access.CARETAKER_ROLE(),     caretaker));
        assertTrue(access.hasRole(access.AUDITOR_ROLE(),       auditor));
        assertFalse(access.hasRole(access.CARETAKER_ROLE(),    stranger));
        assertFalse(access.hasRole(access.AUDITOR_ROLE(),      stranger));
    }

    function test_access_adminCanRevokeRole() public {
        vm.startPrank(admin);
        access.revokeRole(access.CARETAKER_ROLE(), caretaker);
        vm.stopPrank();

        assertFalse(access.hasRole(access.CARETAKER_ROLE(), caretaker));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 2 — AxoloRegistry: tanks
    // ═══════════════════════════════════════════════════════════════════════

    function test_registry_registerTank() public {
        vm.prank(caretaker);
        uint256 id = registry.registerTank("Tanque 01", "Sala A");

        assertEq(id, 1);
        AxoloRegistry.Tank memory t = registry.getTank(1);
        assertEq(t.name,     "Tanque 01");
        assertEq(t.location, "Sala A");
        assertTrue(t.active);
        assertEq(t.registeredBy, caretaker);
    }

    function test_registry_strangerCannotRegisterTank() public {
        vm.prank(stranger);
        vm.expectRevert("AxoloRegistry: caller is not a caretaker");
        registry.registerTank("Tanque X", "Sala X");
    }

    function test_registry_auditorCannotRegisterTank() public {
        vm.prank(auditor);
        vm.expectRevert("AxoloRegistry: caller is not a caretaker");
        registry.registerTank("Tanque X", "Sala X");
    }

    function test_registry_emptyNameReverts() public {
        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: name cannot be empty");
        registry.registerTank("", "Sala A");
    }

    function test_registry_updateTank() public {
        vm.startPrank(caretaker);
        registry.registerTank("Tanque 01", "Sala A");
        registry.updateTank(1, "Tanque 01 Atualizado", "Sala B");
        vm.stopPrank();

        AxoloRegistry.Tank memory t = registry.getTank(1);
        assertEq(t.name,     "Tanque 01 Atualizado");
        assertEq(t.location, "Sala B");
    }

    function test_registry_updateNonExistentTankReverts() public {
        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: tank does not exist");
        registry.updateTank(99, "X", "Y");
    }

    function test_registry_tankCount() public {
        vm.startPrank(caretaker);
        registry.registerTank("T1", "L1");
        registry.registerTank("T2", "L2");
        vm.stopPrank();
        assertEq(registry.tankCount(), 2);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 3 — AxoloRegistry: axolotls
    // ═══════════════════════════════════════════════════════════════════════

    function test_registry_registerAxolotl() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();

        assertEq(axolotlId, 1);
        AxoloRegistry.Axolotl memory a = registry.getAxolotl(axolotlId);
        assertEq(a.name,      "Xolotl");
        assertEq(a.tankId,    tankId);
        assertTrue(a.active);
        assertEq(a.registeredBy, caretaker);
    }

    function test_registry_axolotlAppearsInTankList() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();
        uint256[] memory ids = registry.getAxolotlsInTank(tankId);
        assertEq(ids.length, 1);
        assertEq(ids[0], axolotlId);
    }

    function test_registry_registerAxolotlInNonExistentTankReverts() public {
        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: tank does not exist");
        registry.registerAxolotl(
            "Xolotl", "Ambystoma mexicanum",
            BIRTH_DATE, 99,
            "20cm", PHOTO_HASH
        );
    }

    function test_registry_registerAxolotlWithZeroBirthDateReverts() public {
        vm.prank(caretaker);
        registry.registerTank("T1", "L1");

        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: birthDate cannot be zero");
        registry.registerAxolotl(
            "Xolotl", "Ambystoma mexicanum",
            0, 1,
            "20cm", PHOTO_HASH
        );
    }

    function test_registry_updateAxolotl() public {
        (, uint256 axolotlId) = _setupTankAndAxolotl();
        bytes32 newHash = keccak256("new_photo");

        vm.prank(caretaker);
        registry.updateAxolotl(axolotlId, "Xolotl V2", "22cm, 90g", newHash);

        AxoloRegistry.Axolotl memory a = registry.getAxolotl(axolotlId);
        assertEq(a.name,      "Xolotl V2");
        assertEq(a.morphData, "22cm, 90g");
        assertEq(a.photoHash, newHash);
        assertEq(a.species,   "Ambystoma mexicanum");
    }

    function test_registry_transferAxolotl() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        uint256 tank2Id = registry.registerTank("Tanque 2", "Sala C");
        registry.transferAxolotl(axolotlId, tank2Id);
        vm.stopPrank();

        AxoloRegistry.Axolotl memory a = registry.getAxolotl(axolotlId);
        assertEq(a.tankId, tank2Id);

        uint256[] memory oldList = registry.getAxolotlsInTank(tankId);
        assertEq(oldList.length, 0);

        uint256[] memory newList = registry.getAxolotlsInTank(tank2Id);
        assertEq(newList.length, 1);
        assertEq(newList[0], axolotlId);
    }

    function test_registry_transferToSameTankReverts() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: same tank");
        registry.transferAxolotl(axolotlId, tankId);
    }

    function test_registry_deactivateAxolotl() public {
        (, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        registry.deactivateAxolotl(axolotlId);

        AxoloRegistry.Axolotl memory a = registry.getAxolotl(axolotlId);
        assertFalse(a.active);
    }

    function test_registry_deactivateAxolotlTwiceReverts() public {
        (, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        registry.deactivateAxolotl(axolotlId);
        vm.expectRevert("AxoloRegistry: axolotl already inactive");
        registry.deactivateAxolotl(axolotlId);
        vm.stopPrank();
    }

    function test_registry_cannotDeactivateTankWithActiveAxolotl() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        vm.expectRevert("AxoloRegistry: tank has active axolotls");
        registry.deactivateTank(tankId);
    }

    function test_registry_deactivateTankAfterAxolotlDeactivated() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        registry.deactivateAxolotl(axolotlId);
        registry.deactivateTank(tankId);
        vm.stopPrank();

        AxoloRegistry.Tank memory t = registry.getTank(tankId);
        assertFalse(t.active);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 4 — AxoloMonitoring: recording measurements
    // ═══════════════════════════════════════════════════════════════════════

    function test_monitoring_recordMeasurement() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        assertEq(mId, 1);
        AxoloMonitoring.Measurement memory m = monitoring.getMeasurement(mId);
        assertEq(m.tankId,      tankId);
        assertEq(m.recorder,    caretaker);
        assertEq(m.temperature, 1850);
        assertEq(m.ph,          723);
        assertEq(uint8(m.status), uint8(AxoloMonitoring.MeasurementStatus.Pending));
        assertEq(m.validator,   address(0));
        assertEq(m.validatedAt, 0);
    }

    function test_monitoring_strangerCannotRecord() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(stranger);
        vm.expectRevert("AxoloMonitoring: caller is not a caretaker");
        monitoring.recordMeasurement(_params(tankId));
    }

    function test_monitoring_auditorCannotRecord() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(auditor);
        vm.expectRevert("AxoloMonitoring: caller is not a caretaker");
        monitoring.recordMeasurement(_params(tankId));
    }

    function test_monitoring_cannotRecordForInactiveTank() public {
        (uint256 tankId, uint256 axolotlId) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        registry.deactivateAxolotl(axolotlId);
        registry.deactivateTank(tankId);
        vm.stopPrank();

        vm.prank(caretaker);
        vm.expectRevert("AxoloMonitoring: tank is not active");
        monitoring.recordMeasurement(_params(tankId));
    }

    function test_monitoring_tankStatusUpdatedAfterRecord() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        monitoring.recordMeasurement(_params(tankId));

        AxoloMonitoring.TankStatus memory ts = monitoring.getTankStatus(tankId);
        assertEq(ts.lastPendingId,     1);
        assertEq(ts.totalMeasurements, 1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 5 — AxoloMonitoring: validation
    // ═══════════════════════════════════════════════════════════════════════

    function test_monitoring_validateMeasurement() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(auditor);
        monitoring.validateMeasurement(mId);

        AxoloMonitoring.Measurement memory m = monitoring.getMeasurement(mId);
        assertEq(uint8(m.status), uint8(AxoloMonitoring.MeasurementStatus.Validated));
        assertEq(m.validator,     auditor);
        assertGt(m.validatedAt,   0);
    }

    function test_monitoring_strangerCannotValidate() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(stranger);
        vm.expectRevert("AxoloMonitoring: caller is not an auditor");
        monitoring.validateMeasurement(mId);
    }

    function test_monitoring_caretakerCannotValidate() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(caretaker);
        vm.expectRevert("AxoloMonitoring: caller is not an auditor");
        monitoring.validateMeasurement(mId);
    }

    function test_monitoring_auditorCannotValidateOwnRecord() public {
        vm.startPrank(admin);
        access.grantRole(access.CARETAKER_ROLE(), auditor);
        vm.stopPrank();

        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.startPrank(auditor);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.expectRevert("AxoloMonitoring: auditor cannot validate own record");
        monitoring.validateMeasurement(mId);
        vm.stopPrank();
    }

    function test_monitoring_cannotValidateNonExistentMeasurement() public {
        vm.prank(auditor);
        vm.expectRevert("AxoloMonitoring: measurement does not exist");
        monitoring.validateMeasurement(99);
    }

    function test_monitoring_cannotValidateAlreadyValidated() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.startPrank(auditor);
        monitoring.validateMeasurement(mId);
        vm.expectRevert("AxoloMonitoring: not pending");
        monitoring.validateMeasurement(mId);
        vm.stopPrank();
    }

    function test_monitoring_lastValidatedIdAdvancesMonotonically() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        uint256 m1 = monitoring.recordMeasurement(_params(tankId));
        uint256 m2 = monitoring.recordMeasurement(_params(tankId));
        vm.stopPrank();

        vm.startPrank(auditor);
        monitoring.validateMeasurement(m2);
        monitoring.validateMeasurement(m1);
        vm.stopPrank();

        AxoloMonitoring.TankStatus memory ts = monitoring.getTankStatus(tankId);
        assertEq(ts.lastValidatedId, m2);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 6 — AxoloMonitoring: contestation
    // ═══════════════════════════════════════════════════════════════════════

    function test_monitoring_contestMeasurement() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(auditor);
        monitoring.contestMeasurement(mId, "pH value out of expected range");

        AxoloMonitoring.Measurement memory m = monitoring.getMeasurement(mId);
        assertEq(uint8(m.status), uint8(AxoloMonitoring.MeasurementStatus.Contested));
        assertEq(m.contestReason, "pH value out of expected range");
        assertEq(m.validator,     auditor);
    }

    function test_monitoring_contestWithEmptyReasonReverts() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(auditor);
        vm.expectRevert("AxoloMonitoring: reason cannot be empty");
        monitoring.contestMeasurement(mId, "");
    }

    function test_monitoring_cannotContestAlreadyContested() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.startPrank(auditor);
        monitoring.contestMeasurement(mId, "First reason");
        vm.expectRevert("AxoloMonitoring: not pending");
        monitoring.contestMeasurement(mId, "Second reason");
        vm.stopPrank();
    }

    function test_monitoring_cannotContestValidated() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.startPrank(auditor);
        monitoring.validateMeasurement(mId);
        vm.expectRevert("AxoloMonitoring: not pending");
        monitoring.contestMeasurement(mId, "Too late");
        vm.stopPrank();
    }

    function test_monitoring_contestDoesNotUpdateLastValidatedId() public {
        (uint256 tankId,) = _setupTankAndAxolotl();
        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(auditor);
        monitoring.contestMeasurement(mId, "Bad data");

        AxoloMonitoring.TankStatus memory ts = monitoring.getTankStatus(tankId);
        assertEq(ts.lastValidatedId, 0);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SECTION 7 — AxoloMonitoring: read helpers
    // ═══════════════════════════════════════════════════════════════════════

    function test_monitoring_getLastValidatedMeasurement() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        monitoring.recordMeasurement(_params(tankId));
        uint256 m2 = monitoring.recordMeasurement(_params(tankId));
        vm.stopPrank();

        vm.prank(auditor);
        monitoring.validateMeasurement(m2);

        AxoloMonitoring.Measurement memory last =
            monitoring.getLastValidatedMeasurement(tankId);
        assertEq(last.id, m2);
    }

    function test_monitoring_getLastValidatedRevertsIfNone() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.expectRevert("AxoloMonitoring: no validated measurement for this tank");
        monitoring.getLastValidatedMeasurement(tankId);
    }

    function test_monitoring_measurementCount() public {
        (uint256 tankId,) = _setupTankAndAxolotl();

        vm.startPrank(caretaker);
        monitoring.recordMeasurement(_params(tankId));
        monitoring.recordMeasurement(_params(tankId));
        monitoring.recordMeasurement(_params(tankId));
        vm.stopPrank();

        assertEq(monitoring.measurementCount(), 3);
    }
}