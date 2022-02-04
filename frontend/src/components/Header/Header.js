import React from 'react';
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal";
import { coinaddress } from '../../config';
import admcabi from "../../artifacts/contracts/Adamant.sol/Adamant.json";
import { getContract } from '../../export/export';
import { BigNumber } from '@ethersproject/bignumber';
import eventBus from "../../EventBus";

const Header = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [myBalance, setMyBalance] = useState(0);

    useEffect(async () => {
        let selectedAddress = String(localStorage.getItem('select-address')).toString();
        if (selectedAddress.length == 42) await connect();
        eventBus.on("balance-changed", (data) => refreshBalance(data.account));
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
        await setAccountInfo(accounts[0]);
        let selectedAddress = String(localStorage.getItem('select-address')).toString();
        refreshBalance(selectedAddress);
    });

    const refreshBalance = async (address) => {
        let contractCoin = await getContract(coinaddress, admcabi.abi);
        let balance = await contractCoin.balanceOf(address);
        let res = balance.div(BigNumber.from(Math.pow(10, 9))).toNumber();
        localStorage.setItem('select-balance', res.toString());
        setMyBalance(res.toString());
    }

    const connect = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        if (!connection) return;
        if (!connection.selectedAddress) return;
        let add = connection.selectedAddress;
        await setAccountInfo(add.toString());
    }

    const setAccountInfo = async (addr) => {
        let accountAddress = addr;
        localStorage.setItem('select-address', accountAddress);
        setWalletAddress(String(addr).substring(0, 6) + "..." + String(addr).substring(37, 42));
        let contractCoin = await getContract(coinaddress, admcabi.abi);
        let balance = await contractCoin.balanceOf(addr);
        let res = balance.div(BigNumber.from(Math.pow(10, 9))).toNumber();
        localStorage.setItem('select-balance', res.toString());
        setMyBalance(res.toString());
    }

    return (
        <header id="header header-body">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    {/* <a className="navbar-brand" href="/">
                        <img className="navbar-brand-sticky" src="img/logo.png" alt="sticky brand-logo" />
                    </a> */}

                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto" style={{ position: "" }}>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/sell-assets">Marketplace</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/my-assets">My NFTs</a>
                        </li>
                        <li className="nav-item dropdown">
                            <li className="nav-item"><a href="/create-nft" className="nav-link">Mint NFTs</a></li>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Admin<i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/create-collection" className="nav-link">Create Collection</a></li>
                                <li className="nav-item"><a href="/admin" className="nav-link">Admin Page</a></li>
                            </ul>
                        </li> */}

                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                                <li className="nav-item"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                                <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                                <li className="nav-item"><a href="/auctions" className="nav-link">Live Auctions</a></li>
                                <li className="nav-item"><a href="/item-details" className="nav-link">Item Details</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/activity" className="nav-link">Activity</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Community <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Pages <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                                <li className="nav-item"><a href="/create" className="nav-link">Create</a></li>
                                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/contact" className="nav-link">Contact</a>
                        </li> */}
                    </ul>
                    {/* Navbar Icons */}
                    {/* <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </a>
                        </li>
                    </ul> */}
                    {/* Navbar Toggler */}
                    {/* <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul> */}
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        {(walletAddress.length == 0) && (
                            <li className="nav-item ml-3">
                                <button className="btn ml-lg-auto btn-bordered-white" onClick={connect}><i className="icon-wallet mr-md-2" />Wallet Connect</button>
                            </li>
                        )}
                        {(walletAddress != '') && (
                            <li className="nav-item">
                                <div style={{ display: "inline-block" }}>
                                    <a className="nav-link" style={{ color: 'gray', padding: "0px", justifyContent: "center" }}>{walletAddress}</a>
                                    <a className="nav-link" style={{ color: 'gray', padding: "0px", justifyContent: "center" }}>({myBalance} ADMC)</a>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;