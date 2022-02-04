import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Web3 from 'web3';

// export const Web3Modal = require('web3modal');
// export const ethers = require('ethers');

export const getContract = async(contractAddress, contractAbi) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
}

export const getContractForWeb3 = async(contractAddress, contractAbi) => {
    let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
    return myContract;
}

