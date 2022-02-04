require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const projectId = "b04f4ec70af648a48d92c6315e24e4d3";
const privateKey = fs.readFileSync('./.secret').toString();
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337, //ethereum
      // chainId: 97, //ethereum
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
      accounts: [privateKey]
    },
    rinkedby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },
  paths:{
    sources: "./contracts",
    artifacts: "./src/artifacts"
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // solidity: "0.8.4",
};
