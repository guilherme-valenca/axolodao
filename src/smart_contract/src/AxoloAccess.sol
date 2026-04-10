// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IENSRegistry {
    function resolver(bytes32 node) external view returns (address);
    function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external returns (bytes32);
}

interface IENSResolver {
    function addr(bytes32 node) external view returns (address);
}

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

/// @title AxoloAccess
/// @notice Controle de acesso central do AxoloDAO com verificação de identidade via ENS.
/// @dev Herda ERC2771Context para suporte a gasless transactions via relayer próprio.
contract AxoloAccess is AccessControl, ERC2771Context {

    // -------------------------------------------------------------------------
    // Roles (Cargos)
    // -------------------------------------------------------------------------

    bytes32 public constant CARETAKER_ROLE = keccak256("CARETAKER_ROLE");
    bytes32 public constant AUDITOR_ROLE   = keccak256("AUDITOR_ROLE");

    // -------------------------------------------------------------------------
    // ENS & Instituições Dinâmicas
    // -------------------------------------------------------------------------

    address public constant ENS_REGISTRY = 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e;
    
    // Armazena o namehash de "axolodao2.eth" para servir como nó pai
    bytes32 public immutable AXOLODAO_NODE; 

    struct Instituicao {
        bytes32 role;
        string label;
        bool ativa;
        address gerente;
    }

    // Mapeia o namehash do subdomínio para os dados da Instituição
    mapping(bytes32 => Instituicao) public instituicoes;
    // Mapeia o parentNode ao endereço do gerente responsável por criar subdomínios de usuários
    mapping(bytes32 => address) public gerentePorNode;
    mapping(address => string) public ensName;

    // -------------------------------------------------------------------------
    // Eventos
    // -------------------------------------------------------------------------

    event AcessoRegistrado(
        bytes32 indexed role,
        address indexed account,
        string  label,
        bytes32 indexed parentNode
    );

    event InstituicaoAdicionada(
        string labelInst, 
        bytes32 role, 
        bytes32 node
    );

    event InstituicaoRemovida(
        bytes32 node
    );

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    /// @param forwarder Endereço da RELAYER_WALLET do backend AxoloDAO (ERC-2771).
    constructor(address forwarder) ERC2771Context(forwarder) {
        // msg.sender aqui é o deployer — chamada direta, não relayada.
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Calcula matematicamente o nó de "axolodao2.eth" no momento do deploy
        bytes32 node = bytes32(0);
        node = keccak256(abi.encodePacked(node, keccak256(bytes("eth"))));
        node = keccak256(abi.encodePacked(node, keccak256(bytes("axolodao2"))));
        AXOLODAO_NODE = node;
    }

    // -------------------------------------------------------------------------
    // Administração de Instituições (O Contrato como "Cartório")
    // -------------------------------------------------------------------------

    /// @notice Adiciona um novo subdomínio no ENS e registra a instituição internamente
    /// @param labelInst A sigla da instituição (ex: "usp")
    /// @param role O cargo associado a quem vier desta instituição
    /// @param gerente Carteira que receberá o controle do subdomínio ENS e poderá criar subdomínios de usuários
    function adicionarInstituicao(string calldata labelInst, bytes32 role, address gerente) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(gerente != address(0), "Access: endereco do gerente invalido");

        bytes32 labelHash = keccak256(bytes(labelInst));
        bytes32 novoNode = keccak256(abi.encodePacked(AXOLODAO_NODE, labelHash));

        // 0. VALIDAÇÕES ANTES DE QUALQUER OPERAÇÃO EXTERNA
        require(role == CARETAKER_ROLE || role == AUDITOR_ROLE, "Access: role invalida");
        require(!instituicoes[novoNode].ativa, "Access: instituicao ja existe e esta ativa");

        // 1. CRIA O SUBDOMÍNIO ENS E TRANSFERE O CONTROLE AO GERENTE
        // Requer que este contrato seja o manager atual de axolodao2.eth no ENS Registry
        IENSRegistry(ENS_REGISTRY).setSubnodeOwner(AXOLODAO_NODE, labelHash, gerente);

        // 2. REGISTRA NA BASE DE DADOS INTERNA DO CONTRATO
        instituicoes[novoNode] = Instituicao({
            role: role,
            label: labelInst,
            ativa: true,
            gerente: gerente
        });
        gerentePorNode[novoNode] = gerente;

        emit InstituicaoAdicionada(labelInst, role, novoNode);
    }

    /// @notice Desativa o acesso de uma instituição sem apagar o domínio raiz do ENS
    function removerInstituicao(bytes32 parentNode) external onlyRole(DEFAULT_ADMIN_ROLE) {
        instituicoes[parentNode].ativa = false;
        emit InstituicaoRemovida(parentNode);
    }

    // -------------------------------------------------------------------------
    // Função principal — registro de acesso via ENS
    // -------------------------------------------------------------------------

    function registrarAcesso(string calldata label, bytes32 parentNode) external {
        address sender = _msgSender();

        // 0. VERIFICA INSTITUIÇÃO PRIMEIRO (leitura local, mais barata que chamadas externas)
        Instituicao memory inst = instituicoes[parentNode];
        require(inst.ativa, "ENS: dominio pai nao e uma instituicao reconhecida ou esta inativa");

        // 1. VERIFICA IDENTIDADE VIA ENS (chamadas externas)
        bytes32 node = keccak256(
            abi.encodePacked(parentNode, keccak256(bytes(label)))
        );

        address resolverAddr = IENSRegistry(ENS_REGISTRY).resolver(node);
        require(resolverAddr != address(0), "ENS: resolver nao configurado para este nome");

        address resolvedAddr = IENSResolver(resolverAddr).addr(node);
        require(resolvedAddr != address(0), "ENS: endereco nao configurado para este nome");

        require(resolvedAddr == sender, "ENS: endereco nao corresponde ao msg.sender");

        bytes32 role = inst.role;
        _grantRole(role, sender);

        // Concatena as strings para salvar o subdomínio completo formatado
        ensName[sender] = string(abi.encodePacked(label, ".", inst.label, ".axolodao2.eth"));

        emit AcessoRegistrado(role, sender, label, parentNode);
    }

    // -------------------------------------------------------------------------
    // Overrides obrigatórios — resolvem ambiguidade de herança múltipla
    // -------------------------------------------------------------------------

    function _msgSender() internal view override(Context, ERC2771Context) returns (address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength() internal view override(Context, ERC2771Context) returns (uint256) {
        return ERC2771Context._contextSuffixLength();
    }
}
