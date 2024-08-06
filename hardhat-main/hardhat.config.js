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
  defaultNetwork: 'core',
  networks:{
    hardhat:{},
    core: {
      url:"https://rpc.test.btcs.network",
      accounts:[process.env.DEPLOYER_PRIVATE_KEY.toString()],
      chainId:1115
    },
    arbitrumSepolia:{
      url:`https://arbitrum-sepolia.infura.io/v3/${process.env.ORACULAR_PROTOCOL_INFURA_API_KEY.toString()}`,
      accounts:[process.env.DEPLOYER_PRIVATE_KEY.toString()],
      chainId:421614
    },
    polygonAmoy:{
      url:`https://polygon-amoy.infura.io/v3/${process.env.ORACULAR_PROTOCOL_INFURA_API_KEY.toString()}`,
      accounts:[process.env.DEPLOYER_PRIVATE_KEY.toString()],
      chainId:80002
    }
  }
};
