// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Cookie is ERC721,ERC721Enumerable,IERC721Receiver{

    uint256 cookieId;
    address payable cookieOwner;
    address[] private gossipers;
    uint256 chainId;
    bool isGossipOn;
    uint256 numComments;

    struct Comment{
        uint256 id;
        address commentBy;
        uint256 timestamp;
        string content;
    }

    mapping (uint256 => Comment) private gossipMap;

    constructor(uint256 _id, address payable _owner) ERC721("FortuneCookie", "FCO"){
        cookieId = _id;
        cookieOwner =_owner;
        chainId = block.chainid;
        numComments = 0;
    }

    event ISpeculate(address speculator,bool speculation);

    function spillTheTea() external view returns(uint256,bool,uint256){
        return(chainId,isGossipOn,numComments);
    }

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

    function addAComment(string memory _comment) external {
    require(isGossipOn, "Please wait for the Cookie Owner to start the Gossip.");

    // Create a new Comment struct
    Comment memory comment = Comment({
        id: numComments,
        commentBy: msg.sender, 
        timestamp: block.timestamp,
        content: _comment
    });

    // Store the comment in the mapping
    gossipMap[numComments] = comment;

    // Increment the number of comments
    numComments++;

    // Add to the gossip network
    addToGossipNetwork();
}


   function getAllComments() external view returns (Comment[] memory) {
    Comment[] memory comments = new Comment[](numComments);
    for(uint256 i =1;i<=numComments;i++){
        comments[i-1] = gossipMap[i];
    }
    return comments;
   
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

    function onERC721Received(address, address, uint256, bytes calldata) external virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
}