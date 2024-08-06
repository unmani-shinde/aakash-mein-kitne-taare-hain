// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Cookie is ERC721,ERC721Enumerable{

    uint256 cookieId;
    address payable cookieOwner;
    address[] private gossipers;
    uint256 chainId;
    bool isGossipOn;

    mapping (uint256 => string[]) private gossipMap;

    constructor(uint256 _id, address payable _owner) ERC721("FortuneCookie", "FCO"){
        cookieId = _id;
        cookieOwner =_owner;
        chainId = block.chainid;
    }

    event ISpeculate(address speculator,bool speculation);

    function getSupply() external view returns (uint256) {
        return totalSupply();    
    }

    modifier onlyOwner(){
        require(payable(address(msg.sender))==cookieOwner, "Only the Cookie Owner can start the Gossip");
        _;
    }

    function startGossip() external onlyOwner {
        require(!isGossipOn,"Gossip has already started.");
        isGossipOn = true;        
    }

    function endGossip() external onlyOwner {
        require(isGossipOn, "Gossip has not been started yet.");
        isGossipOn = false;
    }

    function getAllGossipers() external view returns (address[] memory) {
        return gossipers;
    }

    function addToGossipNetwork() private  {
        bool isFound = false;
        for(uint i = 0; i < gossipers.length; i++) {
            if (gossipers[i] == msg.sender) {
                isFound = true;
            }
        }
        if (!isFound){
            gossipers.push(msg.sender);
        }    
    }

    function speculateTrueorFalse(bool _speculation) external payable  {
        require(msg.sender!=cookieOwner,"You cannot speculate on your own cookie!");
        require(isGossipOn,"The cookie owner has closed this thread for gossip");
        emit ISpeculate(msg.sender,_speculation);     
    }

    function addAComment(string memory _comment) external  {
        require(isGossipOn,"Please wait for the Cookie Owner to start the Gossip.");
        gossipMap[block.timestamp] = [string(abi.encodePacked("0x", Strings.toHexString(uint160(msg.sender), 20))),_comment];        
    }

    function getGossip() external view returns (string[][] memory) {
        string[][] memory result = new string[][](gossipMap[block.timestamp].length);        
        for(uint i=0;i<gossipMap[block.timestamp].length;i++){
            result[i] = new string[](1);            
            result[i][0] = gossipMap[block.timestamp][i];            
        }        
        return result;        
    }

    // The following functions are overrides required by Solidity.
    
    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
}