// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./AxoloAccess.sol";
import "./AxoloEAS.sol"; 
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

/// @title AxoloRegistry
/// @notice Registro de axolotls e tanques. Deve ser implantado APÓS AxoloAccess.
///
/// @dev Herda ERC2771Context para suporte a gasless transactions via relayer próprio.
///      Passar o mesmo forwarder (RELAYER_WALLET) usado no AxoloAccess.
contract AxoloRegistry is ERC2771Context {

    AxoloAccess public accessControl;
    IEAS        public immutable eas;              
    bytes32     public tankSchemaUID;              
    bytes32     public axolotlSchemaUID;           
    bytes32     public transferSchemaUID;          
    bytes32     public deactivateSchemaUID;        

    bytes32 public constant CARETAKER_ROLE = keccak256("CARETAKER_ROLE");

    modifier onlyCaretaker() {
        require(
            accessControl.hasRole(CARETAKER_ROLE, _msgSender()),
            "AxoloRegistry: caller is not a caretaker"
        );
        _;
    }

    // ─── Structs ──────────────────────────────────────────────────────────

    struct Axolotl {
        uint256 id;
        string  name;
        string  species;
        uint256 birthDate;
        uint256 tankId;
        string  morphData;
        bytes32 photoHash;
        address registeredBy;
        uint256 registeredAt;
        bool    active;
        bytes32 attestationUID; 
    }

    struct Tank {
        uint256 id;
        string  name;
        string  location;
        address registeredBy;
        uint256 registeredAt;
        bool    active;
        bytes32 attestationUID; 
    }

    // ─── Estado ───────────────────────────────────────────────────────────

    uint256 public nextAxolotlId = 1;
    uint256 public nextTankId    = 1;

    mapping(uint256 => Axolotl)    public axolotls;
    mapping(uint256 => Tank)       public tanks;
    mapping(uint256 => uint256[])  public tankAxolotls;

    // ─── Eventos ──────────────────────────────────────────────────────────

    event TankRegistered(
        uint256 indexed tankId,
        address indexed registeredBy,
        string name,
        string location
    );

    event TankUpdated(
        uint256 indexed tankId,
        address indexed updatedBy,
        string newName,
        string newLocation
    );

    event TankDeactivated(
        uint256 indexed tankId,
        address indexed by
    );

    event AxolotlRegistered(
        uint256 indexed axolotlId,
        uint256 indexed tankId,
        address indexed registeredBy,
        string name,
        string species,
        uint256 birthDate
    );

    event AxolotlUpdated(
        uint256 indexed axolotlId,
        address indexed updatedBy,
        string newName,
        string newMorphData,
        bytes32 newPhotoHash
    );

    event AxolotlTransferred(
        uint256 indexed axolotlId,
        uint256 indexed fromTankId,
        uint256 indexed toTankId
    );

    event AxolotlDeactivated(
        uint256 indexed axolotlId,
        address indexed by
    );

    // ─── Construtor ───────────────────────────────────────────────────────

    /// @param _accessControl    Endereço do AxoloAccess já implantado.
    /// @param _eas              Endereço do contrato EAS na rede.               
    /// @param _tankSchema       UID do schema de registro de tanque.            
    /// @param _axolotlSchema    UID do schema de registro de axolote.           
    /// @param _transferSchema   UID do schema de transferência de axolote.      
    /// @param _deactivateSchema UID do schema de desativação de axolote.        
    /// @param forwarder         Endereço da RELAYER_WALLET do backend AxoloDAO (ERC-2771).
    constructor(
        address _accessControl,
        address _eas,              
        bytes32 _tankSchema,       
        bytes32 _axolotlSchema,    
        bytes32 _transferSchema,   
        bytes32 _deactivateSchema, 
        address forwarder
    ) ERC2771Context(forwarder) {
        require(_accessControl   != address(0), "AxoloRegistry: zero address");
        require(_eas             != address(0), "AxoloRegistry: zero address"); 
        accessControl        = AxoloAccess(_accessControl);
        eas                  = IEAS(_eas);             
        tankSchemaUID        = _tankSchema;            
        axolotlSchemaUID     = _axolotlSchema;         
        transferSchemaUID    = _transferSchema;        
        deactivateSchemaUID  = _deactivateSchema;      
    }

    // ─── Funções de Tanque ────────────────────────────────────────────────

    function registerTank(
        string calldata name,
        string calldata location
    ) external onlyCaretaker returns (uint256 tankId) {
        require(bytes(name).length > 0, "AxoloRegistry: name cannot be empty");
        address sender = _msgSender();
        tankId = nextTankId++;
        tanks[tankId] = Tank({
            id:           tankId,
            name:         name,
            location:     location,
            registeredBy: sender,
            registeredAt: block.timestamp,
            active:       true,
            attestationUID: bytes32(0) 
        });

        tanks[tankId].attestationUID = _attestTank(tanks[tankId]); 

        emit TankRegistered(tankId, sender, name, location);
    }

    function updateTank(
        uint256 tankId,
        string calldata newName,
        string calldata newLocation
    ) external onlyCaretaker {
        require(tanks[tankId].id != 0, "AxoloRegistry: tank does not exist");
        require(tanks[tankId].active, "AxoloRegistry: tank is not active");
        tanks[tankId].name     = newName;
        tanks[tankId].location = newLocation;
        emit TankUpdated(tankId, _msgSender(), newName, newLocation);
    }

    function deactivateTank(uint256 tankId) external onlyCaretaker {
        require(tanks[tankId].id != 0, "AxoloRegistry: tank does not exist");
        require(tanks[tankId].active, "AxoloRegistry: tank already inactive");
        uint256[] storage ids = tankAxolotls[tankId];
        for (uint256 i = 0; i < ids.length; i++) {
            require(!axolotls[ids[i]].active, "AxoloRegistry: tank has active axolotls");
        }
        tanks[tankId].active = false;
        emit TankDeactivated(tankId, _msgSender());
    }

    // ─── Funções de Axolotl ───────────────────────────────────────────────

    function registerAxolotl(
        string  calldata name,
        string  calldata species,
        uint256 birthDate,
        uint256 tankId,
        string  calldata morphData,
        bytes32 photoHash
    ) external onlyCaretaker returns (uint256 axolotlId) {
        require(tanks[tankId].id != 0, "AxoloRegistry: tank does not exist");
        require(tanks[tankId].active, "AxoloRegistry: tank is not active");
        require(bytes(name).length > 0, "AxoloRegistry: name cannot be empty");
        require(bytes(species).length > 0, "AxoloRegistry: species cannot be empty");
        require(bytes(morphData).length > 0, "AxoloRegistry: morphData cannot be empty");
        require(birthDate > 0, "AxoloRegistry: birthDate cannot be zero");
        require(photoHash != bytes32(0), "AxoloRegistry: photoHash cannot be zero");

        address sender = _msgSender();
        axolotlId = nextAxolotlId++;
        axolotls[axolotlId] = Axolotl({
            id:           axolotlId,
            name:         name,
            species:      species,
            birthDate:    birthDate,
            tankId:       tankId,
            morphData:    morphData,
            photoHash:    photoHash,
            registeredBy: sender,
            registeredAt: block.timestamp,
            active:       true,
            attestationUID: bytes32(0) 
        });

        axolotls[axolotlId].attestationUID = _attestAxolotl(axolotls[axolotlId]); 

        tankAxolotls[tankId].push(axolotlId);
        emit AxolotlRegistered(axolotlId, tankId, sender, name, species, birthDate);
    }

    function updateAxolotl(
        uint256  axolotlId,
        string  calldata newName,
        string  calldata newMorphData,
        bytes32 newPhotoHash
    ) external onlyCaretaker {
        require(axolotls[axolotlId].id != 0, "AxoloRegistry: axolotl does not exist");
        require(axolotls[axolotlId].active, "AxoloRegistry: axolotl is not active");
        axolotls[axolotlId].name      = newName;
        axolotls[axolotlId].morphData = newMorphData;
        axolotls[axolotlId].photoHash = newPhotoHash;
        emit AxolotlUpdated(axolotlId, _msgSender(), newName, newMorphData, newPhotoHash);
    }

    function transferAxolotl(uint256 axolotlId, uint256 newTankId) external onlyCaretaker {
        require(axolotls[axolotlId].id != 0, "AxoloRegistry: axolotl does not exist");
        require(axolotls[axolotlId].active, "AxoloRegistry: axolotl is not active");
        require(tanks[newTankId].id != 0, "AxoloRegistry: destination tank does not exist");
        require(tanks[newTankId].active, "AxoloRegistry: destination tank is not active");

        uint256 fromTankId = axolotls[axolotlId].tankId;
        require(fromTankId != newTankId, "AxoloRegistry: same tank");

        uint256[] storage oldList = tankAxolotls[fromTankId];
        for (uint256 i = 0; i < oldList.length; i++) {
            if (oldList[i] == axolotlId) {
                oldList[i] = oldList[oldList.length - 1];
                oldList.pop();
                break;
            }
        }

        tankAxolotls[newTankId].push(axolotlId);
        axolotls[axolotlId].tankId = newTankId;

        _attestTransfer(axolotlId, fromTankId, newTankId, _msgSender()); 

        emit AxolotlTransferred(axolotlId, fromTankId, newTankId);
    }

    function deactivateAxolotl(uint256 axolotlId) external onlyCaretaker {
        require(axolotls[axolotlId].id != 0, "AxoloRegistry: axolotl does not exist");
        require(axolotls[axolotlId].active, "AxoloRegistry: axolotl already inactive");
        axolotls[axolotlId].active = false;

        _attestDeactivate(axolotlId, axolotls[axolotlId].tankId, _msgSender()); 

        emit AxolotlDeactivated(axolotlId, _msgSender());
    }

    // ─── Funções de Leitura ───────────────────────────────────────────────

    function getAxolotl(uint256 axolotlId) external view returns (Axolotl memory) {
        require(axolotls[axolotlId].id != 0, "AxoloRegistry: axolotl does not exist");
        return axolotls[axolotlId];
    }

    function getTank(uint256 tankId) external view returns (Tank memory) {
        require(tanks[tankId].id != 0, "AxoloRegistry: tank does not exist");
        return tanks[tankId];
    }

    function getAxolotlsInTank(uint256 tankId) external view returns (uint256[] memory) {
        return tankAxolotls[tankId];
    }

    function axolotlCount() external view returns (uint256) {
        return nextAxolotlId - 1;
    }

    function tankCount() external view returns (uint256) {
        return nextTankId - 1;
    }

    // ─── EAS interno ────────────────────────────────────────────────────────  (bloco inteiro)

    /// @dev Atesta o registro de um tanque.
    function _attestTank(Tank storage t) internal returns (bytes32) {
        return eas.attest(AttestationRequest({
            schema: tankSchemaUID,
            data: AttestationRequestData({
                recipient:      t.registeredBy,
                expirationTime: 0,
                revocable:      true,
                refUID:         bytes32(0),
                data:           abi.encode(t.id, t.name, t.location, t.registeredBy),
                value:          0
            })
        }));
    }

    /// @dev Atesta o registro de um axolote.
    function _attestAxolotl(Axolotl storage a) internal returns (bytes32) {
        return eas.attest(AttestationRequest({
            schema: axolotlSchemaUID,
            data: AttestationRequestData({
                recipient:      a.registeredBy,
                expirationTime: 0,
                revocable:      true,
                refUID:         bytes32(0),
                data:           abi.encode(a.id, a.tankId, a.name, a.species, a.birthDate, a.registeredBy),
                value:          0
            })
        }));
    }

    /// @dev Atesta a transferência de um axolote entre tanques.
    function _attestTransfer(uint256 axolotlId, uint256 fromTankId, uint256 toTankId, address movedBy) internal {
        eas.attest(AttestationRequest({
            schema: transferSchemaUID,
            data: AttestationRequestData({
                recipient:      movedBy,
                expirationTime: 0,
                revocable:      true,
                refUID:         bytes32(0),
                data:           abi.encode(axolotlId, fromTankId, toTankId, movedBy),
                value:          0
            })
        }));
    }

    /// @dev Atesta a desativação de um axolote.
    function _attestDeactivate(uint256 axolotlId, uint256 tankId, address deactivatedBy) internal {
        eas.attest(AttestationRequest({
            schema: deactivateSchemaUID,
            data: AttestationRequestData({
                recipient:      deactivatedBy,
                expirationTime: 0,
                revocable:      true,
                refUID:         bytes32(0),
                data:           abi.encode(axolotlId, tankId, deactivatedBy),
                value:          0
            })
        }));
    }

    // ─── Overrides obrigatórios — resolvem ambiguidade de herança múltipla ───

    function _msgSender() internal view override(ERC2771Context) returns (address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength() internal view override(ERC2771Context) returns (uint256) {
        return ERC2771Context._contextSuffixLength();
    }
}