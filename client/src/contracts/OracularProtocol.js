import contractJSON from "../../../hardhat-main/artifacts/contracts/OracularProtocol.sol/OracularProtocol.json";
export const OracularProtocolContract = contractJSON;

import contractAddr from "../../../hardhat-main/ignition/deployments/chain-421614/deployed_addresses.json";
export const OracleProtocolAddress = contractAddr["ProtocolModule#OracularProtocol"];

import contractAddrCore from "../../../hardhat-main/ignition/deployments/chain-1115/deployed_addresses.json";
export const OracleProtocolAddressCore = contractAddrCore["ProtocolModule#OracularProtocol"]

import contractAddrAmoy from "../../../hardhat-main/ignition/deployments/chain-80002/deployed_addresses.json";
export const OracleProtocolAddressAmoy = contractAddrAmoy["ProtocolModule#OracularProtocol"];