// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/// @notice Structs e interface mínima do EAS usados pelo AxoloMonitoring.
/// Não importa o pacote npm — apenas o ABI necessário para compilar.

struct AttestationRequestData {
    address recipient;       // quem recebe a atestação (m.recorder no nosso caso)
    uint64  expirationTime;  // 0 = sem expiração
    bool    revocable;       // true = auditor pode revogar se errou
    bytes32 refUID;          // referência a outra atestação (0 = nenhuma)
    bytes   data;            // abi.encode dos campos do schema
    uint256 value;           // ETH junto (0 para nós)
}

struct AttestationRequest {
    bytes32                schema;  // UID do schema registrado uma vez
    AttestationRequestData data;
}

interface IEAS {
    function attest(AttestationRequest calldata request)
        external payable returns (bytes32 uid);
}