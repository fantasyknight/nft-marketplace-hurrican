const FormData = require("form-data");
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const PUBLIC_KEY1 = process.env.PUBLIC_KEY1;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;

const PUBLIC_KEY2 = process.env.PUBLIC_KEY2;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

const PUBLIC_KEY3 = process.env.PUBLIC_KEY3;
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3;

// const contract = require("..src/artifacts/contracts/MyNFT.sol/MyNFT.json");
// const contract = require("../src/artifacts/contracts/NFT.sol/NFT.json");
// const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const coinAbi = require("../src/artifacts/contracts/Adamant.sol/Adamant.json");
const nftAbi = require("../src/artifacts/contracts/AdamantNFT.sol/AdamantNFT.json");
const marketAbi = require("../src/artifacts/contracts/AdamMarket.sol/AdamantMarket.json");
const coinaddress = "0xB1caD7Fe9F5Bd01caE4A4067B985f43731aA58Af";
const nftmarketaddress = "0xA036eBeB3Be6Aec11D20890540E9F3691DE92E76";
const nftaddress = "0x761d80c9C0fA2037f568E03fE9368B979eb7c998";
const coinContract = new web3.eth.Contract(coinAbi.abi, coinaddress);
const marketContract = new web3.eth.Contract(marketAbi.abi, nftmarketaddress);
const nftContract = new web3.eth.Contract(nftAbi.abi, nftaddress);


async function mint() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY1, 'latest');
  const tx = {
    'from': PUBLIC_KEY1,
    'to': nftaddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.addCollection("shiba", 1000, 1000).encodeABI()
  };
//   let transaction = await web3.eth.sendTransaction(tx);
//   console.log("transaction: ", transaction);

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY1);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
            if (!err) {
                console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
            } else {
                console.log("Something went wrong when submitting your transaction:", err)
            }
        });
    }).catch((err) => {
        console.log(" Promise failed:", err);
    });
}
mint();

async function checkFunc(){

//   await mintNFT("https://gateway.pinata.cloud/ipfs/Qma5HLc7k7uiMVjk3mEPssCGWJb9DwuQQMNHqGfZf3yLWo");
//   let count = await nftContract.methods.getTokenCount().call();
//   console.log("==== token count ======");
//   console.log(count);
//   let tokenURI = await nftContract.methods.getCurrentURI().call();
//   console.log(String(tokenURI).toString());
}

// checkFunc();

