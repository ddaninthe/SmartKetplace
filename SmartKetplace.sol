pragma solidity ^0.5.12;

contract SmartKetplace {
    struct House {
        string location;
        uint8 roomCount;
        uint16 area;
        uint32 price;
        uint256[] documents;
    }
    
    House[] public houses;
    mapping (uint256 => address payable) public houseToOwner;
    
    // Evènement lors de l'ajout d'une maison dans le catalogue
    event NewHouse(uint houseId);
    // Evènement lors du transfert du propriété d'une maison
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    
    // L'acheteur doit être l'exécuteur de la requête
    modifier onlyBuyer(address buyer){
        require(msg.sender == buyer);
        _;
    }

    // Ajout d'une maison dans le catalogue de vente
    function addHouse(string memory _location, uint8 _roomCount, uint16 _area, uint32 _price, uint[] memory _documents) public {
        uint id = houses.push(House(_location, _roomCount, _area, _price, _documents)) - 1;
        houseToOwner[id] = msg.sender;
        emit NewHouse(id);
    }
    
    // Achat d'une maison par une personne
    function buyHouse(uint _houseId, address payable _buyer) public onlyBuyer(_buyer) payable {
        require(msg.value == getHousePrice(_houseId));
        
        // Transfert monétaire
        address payable oldOwner = houseToOwner[_houseId];
        oldOwner.transfer(msg.value);
        
        // Transfert de la propriété dans la blockchain
        houseToOwner[_houseId] = _buyer;
        
        // Appel de l'évènement
        emit Transfer(oldOwner, _buyer, _houseId);
    }
    
    // Récupération du prix d'une maison
    function getHousePrice(uint _houseId) private view returns(uint32) {
        return houses[_houseId].price;
    }
}