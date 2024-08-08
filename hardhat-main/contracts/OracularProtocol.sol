// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "contracts/Cookie.sol";

contract OracularProtocol is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor()
        ERC721("FortuneCookie", "FCO")
    {
        _nextTokenId = 1;
    }

    mapping (uint256=>address) private Cookies; //token ID -> (associated contract address)

    event CookieMinted(address tokenOwner, uint256 tokenId,string uri);
    event CookieSentToGossip(address tokenOwner,uint256 tokenId, address gossipNetworkId);
    event ISpeculated(address speculator,uint256 speculationAmt, uint256 cookieId,bool speculation);

    function mintMyCookie(string memory _metadata) external {
        address _to = address(msg.sender);
        uint256 tokenId = _nextTokenId++;
        require(bytes(_metadata).length > 0, "Metadata is empty");
        Cookies[tokenId] = address(0x00);        
        safeMint(_to, _metadata);
        emit CookieMinted(_to, tokenId,_metadata);
    }

    function sendCookieToGossipNetwork(uint256 cookieID) external {
        require(Cookies[cookieID]==address(0x00),"This cookie already exists on the Gossip Network!");
        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        address gossipNetworkId = Create2.deploy(0,_salt, abi.encodePacked(type(Cookie).creationCode, abi.encode(cookieID,payable (address(msg.sender))))
        );
        safeTransferFrom(msg.sender,gossipNetworkId, cookieID);
        Cookies[cookieID] = gossipNetworkId;
        emit CookieSentToGossip(msg.sender,cookieID,Cookies[cookieID]);
    }

    function getCookieMap(uint256 tokenId) external view returns (address){
        return Cookies[tokenId];
    }

    function iSpeculate(address speculator, uint256 speculationAmount, uint256 cookieId,bool speculaton ) external{
        emit ISpeculated(speculator,speculationAmount,cookieId,speculaton);
    }

    // function sendCookieToMatch() external {
        
    // }



    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
    }

    // The following functions are overrides required by Solidity.

     function _burn(uint256 tokenId) internal override(ERC721,ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
