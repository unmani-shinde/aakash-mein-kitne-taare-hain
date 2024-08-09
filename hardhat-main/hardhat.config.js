require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 400
      }
    }
  },
  defaultNetwork: 'polygonAmoy',
  networks:{
    hardhat:{},
    core: {
      url:"https://rpc.test.btcs.network",
      accounts:[process.env.DEPLOYER_PRIVATE_KEY.toString()],
      chainId:1115
    },
    arbitrumSepolia:{
      url:`https://sepolia-rollup.arbitrum.io/rpc`,
      accounts:[process.env.DEPLOYER_PRIVATE_KEY_NEXT.toString()],
      chainId:421614
    },
    polygonAmoy:{
      url:`https://polygon-amoy-bor-rpc.publicnode.com`,
      accounts:["ffc9e8f09b0cf6ddf10872ca0a08184108b760b8c70c21a6befbc789b31d35db"],
      chainId:80002
    }
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
 },
 mocha: {
    timeout: 20000,
 },  
};
