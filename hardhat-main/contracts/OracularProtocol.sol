// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "contracts/Cookie.sol";

contract OracularProtocol is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor()
        ERC721("FortuneCookie", "FCO")
    {
        _nextTokenId = 1;
    }

    mapping (uint256=>address) private Cookies; //token ID -> (associated contract address)

    event CookieMinted(address tokenOwner, uint256 tokenId);
    event CookieSentToGossip(address tokenOwner,uint256 tokenId, address gossipNetworkId);

    function mintMyCookie(string memory _metadata) external {
        address _to = address(msg.sender);
        uint256 tokenId = _nextTokenId-1;
        require(bytes(_metadata).length > 0, "Metadata is empty");
        Cookies[tokenId] = address(0x00);        
        safeMint(_to, _metadata);
        emit CookieMinted(_to, tokenId);
    }

    function sendCookieToGossipNetwork(uint256 cookieID) external {
        require(Cookies[cookieID]==address(0x00),"This cookie already exists on the Gossip Network!");
        ERC721 newContract = new Cookie(cookieID,payable (address(msg.sender)));
        Cookies[cookieID] = address(newContract);
        emit CookieSentToGossip(msg.sender,cookieID,Cookies[cookieID]);
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
