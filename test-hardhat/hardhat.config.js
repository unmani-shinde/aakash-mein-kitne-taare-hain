require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: 'core',
  networks:{
    hardhat:{},
    core: {
      url:"https://rpc.test.btcs.network",
      accounts:[process.env.DEPLOYER_PRIVATE_KEY.toString()],
      chainId:1115
    }
  }
};
