const FormData = require("form-data");
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log(PUBLIC_KEY);
console.log(PRIVATE_KEY);
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contract = require("..src/artifacts/contracts/MyNFT.sol/MyNFT.json");
const contract = require("../src/artifacts/contracts/NFT.sol/NFT.json");
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
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

async function checkFunc(){
  await mintNFT("https://gateway.pinata.cloud/ipfs/Qma5HLc7k7uiMVjk3mEPssCGWJb9DwuQQMNHqGfZf3yLWo");
  let count = await nftContract.methods.getTokenCount().call();
  console.log("==== token count ======");
  console.log(count);
  let tokenURI = await nftContract.methods.getCurrentURI().call();
  console.log(String(tokenURI).toString());
}

checkFunc();