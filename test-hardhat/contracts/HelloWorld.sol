// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

contract HelloWorld {

    string private greeting;

    constructor() {
        greeting="Hello World!";
    }

    function getGreeting() external view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory newGreeting) external {
        greeting = newGreeting;
    }


}