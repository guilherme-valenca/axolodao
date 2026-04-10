// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/AxoloAccess.sol";
import "../src/AxoloRegistry.sol";
import "../src/AxoloMonitoring.sol";

struct EASRevocationRequestData {
    bytes32 uid;
    uint256 value;
}

struct EASRevocationRequest {
    bytes32 schema;
    EASRevocationRequestData data;
}

interface IEASRevoke {
    function revoke(EASRevocationRequest calldata request) external payable;
}

contract MockEASWithRevoke {
    uint256 private _uid;
    uint256 public attestCount;
    uint256 public revokeCount;

    mapping(bytes32 => bool) public revoked;

    function attest(AttestationRequest calldata) external returns (bytes32 uid) {
        _uid++;
        uid = bytes32(_uid);
        attestCount++;
    }

    function revoke(EASRevocationRequest calldata request) external payable {
        revoked[request.data.uid] = true;
        revokeCount++;
    }

    function wasRevoked(bytes32 uid) external view returns (bool) {
        return revoked[uid];
    }
}

contract AxoloEASFlowIntegrationTest is Test {
    AxoloAccess access;
    AxoloRegistry registry;
    AxoloMonitoring monitoring;
    MockEASWithRevoke eas;

    address admin = makeAddr("admin");
    address caretaker = makeAddr("caretaker");
    address auditor = makeAddr("auditor");

    bytes32 constant PHOTO_HASH = keccak256("photo_ipfs_cid");
    uint256 constant BIRTH_DATE = 1_700_000_000;

    function setUp() public {
        vm.startPrank(admin);

        address forwarder = makeAddr("forwarder");
        eas = new MockEASWithRevoke();

        access = new AxoloAccess(forwarder);

        registry = new AxoloRegistry(
            address(access),
            address(eas),
            keccak256("tankSchema"),
            keccak256("axolotlSchema"),
            keccak256("transferSchema"),
            keccak256("deactivateSchema"),
            forwarder
        );

        monitoring = new AxoloMonitoring(
            address(access),
            address(registry),
            address(eas),
            keccak256("measurementSchema"),
            forwarder
        );

        access.grantRole(access.CARETAKER_ROLE(), caretaker);
        access.grantRole(access.AUDITOR_ROLE(), auditor);

        vm.stopPrank();
    }

    function _params(uint256 tankId)
        internal
        pure
        returns (AxoloMonitoring.MeasurementParams memory)
    {
        return
            AxoloMonitoring.MeasurementParams({
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

    function _setupActiveTank() internal returns (uint256 tankId) {
        vm.startPrank(caretaker);

        tankId = registry.registerTank("Tanque Principal", "Sala B");
        registry.registerAxolotl(
            "Xolotl",
            "Ambystoma mexicanum",
            BIRTH_DATE,
            tankId,
            "20cm, 80g, leucistico",
            PHOTO_HASH
        );

        vm.stopPrank();
    }

    function test_eas_pendingToValidated_emitsAttestation() public {
        uint256 tankId = _setupActiveTank();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        AxoloMonitoring.Measurement memory pending = monitoring.getMeasurement(mId);
        assertEq(uint8(pending.status), uint8(AxoloMonitoring.MeasurementStatus.Pending));
        assertEq(pending.attestationUID, bytes32(0));

        uint256 attestBefore = eas.attestCount();

        vm.prank(auditor);
        monitoring.validateMeasurement(mId);

        AxoloMonitoring.Measurement memory validated = monitoring.getMeasurement(mId);
        assertEq(uint8(validated.status), uint8(AxoloMonitoring.MeasurementStatus.Validated));
        assertEq(validated.validator, auditor);
        assertGt(validated.validatedAt, 0);
        assertTrue(validated.attestationUID != bytes32(0));
        assertEq(eas.attestCount(), attestBefore + 1);
    }

    function test_eas_pendingToContested_withReason() public {
        uint256 tankId = _setupActiveTank();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        uint256 attestBefore = eas.attestCount();

        vm.prank(auditor);
        monitoring.contestMeasurement(mId, "Leitura inconsistente com o historico");

        AxoloMonitoring.Measurement memory contested = monitoring.getMeasurement(mId);
        assertEq(uint8(contested.status), uint8(AxoloMonitoring.MeasurementStatus.Contested));
        assertEq(contested.contestReason, "Leitura inconsistente com o historico");
        assertEq(contested.validator, auditor);
        assertEq(contested.attestationUID, bytes32(0));
        assertEq(eas.attestCount(), attestBefore);
    }

    function test_eas_validatedAttestation_canBeRevokedLater() public {
        uint256 tankId = _setupActiveTank();

        vm.prank(caretaker);
        uint256 mId = monitoring.recordMeasurement(_params(tankId));

        vm.prank(auditor);
        monitoring.validateMeasurement(mId);

        AxoloMonitoring.Measurement memory validated = monitoring.getMeasurement(mId);
        bytes32 uid = validated.attestationUID;
        assertTrue(uid != bytes32(0));

        uint256 revokeBefore = eas.revokeCount();

        EASRevocationRequest memory req = EASRevocationRequest({
            schema: monitoring.measurementSchemaUID(),
            data: EASRevocationRequestData({uid: uid, value: 0})
        });

        vm.prank(auditor);
        IEASRevoke(address(eas)).revoke(req);

        assertEq(eas.revokeCount(), revokeBefore + 1);
        assertTrue(eas.wasRevoked(uid));

        AxoloMonitoring.Measurement memory stillValidated = monitoring.getMeasurement(mId);
        assertEq(uint8(stillValidated.status), uint8(AxoloMonitoring.MeasurementStatus.Validated));
    }
}
