// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/AxoloAccess.sol";
import "../src/AxoloRegistry.sol";
import "../src/AxoloMonitoring.sol";

/**
 * @title  Deploy
 * @notice Deploys AxoloAccess → AxoloRegistry → AxoloMonitoring in one shot.
 *         Admin rights stay with the deployer wallet (personal wallet).
 *
 * HOW TO RUN
 * ----------
 * 1. Copy deploy/.env.example → smart_contract/.env and fill in your values.
 * 2. From the smart_contract/ folder, run:
 *
 *    Dry-run (no real transactions, free):
 *      forge script deploy/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL
 *
 *    Real deployment (sends transactions, costs Sepolia ETH):
 *      forge script deploy/Deploy.s.sol \
 *        --rpc-url $SEPOLIA_RPC_URL \
 *        --private-key $DEPLOYER_PRIVATE_KEY \
 *        --broadcast \
 *        --verify
 *
 *    Foundry will print the three deployed addresses when done.
 *    It also saves a full log to broadcast/Deploy.s.sol/<chainId>/run-latest.json
 */
contract Deploy is Script {

    // -------------------------------------------------------------------------
    // Sepolia EAS contract (never changes)
    // -------------------------------------------------------------------------
    address constant EAS = 0xC2679fBD37d54388Ce493F1DB75320D236e1815e;

    // -------------------------------------------------------------------------
    // EAS Schema UIDs (registered on Sepolia SchemaRegistry)
    // Schema numbers: tank=4109, axolotl=4110, transfer=4111,
    //                 deactivate=4112, measurement=4099
    // -------------------------------------------------------------------------
    bytes32 constant TANK_SCHEMA        = 0x8a8e9d8bd6322cf146344430e9dd8af915d1b0d407df287a3304f3b91bbb3299;
    bytes32 constant AXOLOTL_SCHEMA     = 0x63469ddbf6a76615208b2dd353a6cfdf303f03bbeb51c741aed7795a0bfc4cba;
    bytes32 constant TRANSFER_SCHEMA    = 0xc15341b889791dee3513e8c3f81223b9078db1f5f82efd334f497300c824475a;
    bytes32 constant DEACTIVATE_SCHEMA  = 0x88a8d5da733fa37f9a6a46ecaa30d0aee2cbe48c0572394d4b4145fd4bb0e534;
    bytes32 constant MEASUREMENT_SCHEMA = 0x5b54f92bc94a2a1e5b483454fad3519889a66d1e2a952223383464ada6ffb17a;

    // -------------------------------------------------------------------------

    function run() external {
        // FORWARDER = the relayer wallet address (hot wallet that pays gas
        // and appends the user address to calldata for ERC-2771).
        // Read from .env so it never lives in source code.
        address forwarder = vm.envAddress("RELAYER_WALLET_ADDRESS");

        // Everything inside startBroadcast / stopBroadcast is signed with
        // DEPLOYER_PRIVATE_KEY and sent as real on-chain transactions.
        vm.startBroadcast();

        // 1 — AxoloAccess
        //     msg.sender (deployer) becomes DEFAULT_ADMIN_ROLE here.
        AxoloAccess access = new AxoloAccess(forwarder);

        // 2 — AxoloRegistry
        AxoloRegistry registry = new AxoloRegistry(
            address(access),
            EAS,
            TANK_SCHEMA,
            AXOLOTL_SCHEMA,
            TRANSFER_SCHEMA,
            DEACTIVATE_SCHEMA,
            forwarder
        );

        // 3 — AxoloMonitoring
        AxoloMonitoring monitoring = new AxoloMonitoring(
            address(access),
            address(registry),
            EAS,
            MEASUREMENT_SCHEMA,
            forwarder
        );

        // Admin rights stay with the deployer (msg.sender / personal wallet).
        // DEFAULT_ADMIN_ROLE was already granted to msg.sender inside the
        // AxoloAccess constructor — no extra step needed here.

        vm.stopBroadcast();

        // Print deployed addresses to the terminal for easy copy-paste into
        // axolodao-relayer/.env and axolodao.html
        console.log("=== DEPLOYED ADDRESSES ===");
        console.log("AxoloAccess    :", address(access));
        console.log("AxoloRegistry  :", address(registry));
        console.log("AxoloMonitoring:", address(monitoring));
        console.log("==========================");
        console.log("Update axolodao-relayer/.env and axolodao.html with these values.");
    }
}
