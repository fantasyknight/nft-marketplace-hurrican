import React, { Component } from 'react';
import axios from 'axios';
import { nftaddress, coinaddress } from '../../config';
import nftabi from "../../artifacts/contracts/NFT.sol/NFT.json";
import admcabi from "../../artifacts/contracts/Adamant.sol/Adamant.json";
import { getContract } from '../../export/export';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/explore";

class SellAssetCmp extends Component {
    state = {
        data: {},
        exploreData: [],
        collectionItems: [],
        selectedCollection: {},
        nftItems: [],
        selectedToken: 0,
        startProgress: false,
        clicked: false
    }

    componentDidMount = async () => {
        this.onBuyNFT = this.onBuyNFT.bind(this);
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: {},
                    exploreData: []
                })
            })
            .catch(err => console.log(err))
        await this.loadCollections();
    }

    loadCollections = async () => {
        const nftContract = await getContract(nftaddress, nftabi.abi)
        const collections = await nftContract.fetchCollections()
        let collectionData = []
        await Promise.all(collections.map(async (collection) => {
            const listedTokens = await nftContract.getListedNFTs(parseInt(collection.id))
            collectionData.push({
                collectionId: parseInt(collection.id),
                name: collection.name,
                tokenURI: collection.collectionUri,
                totalMints: parseInt(collection.totalMints),
                limits: parseInt(collection.limits),
                mintPrice: parseInt(collection.price),
                listNFTs: listedTokens.length > 0 ? listedTokens.map(nft => {
                    return {
                        tokenId: parseInt(nft.tokenId),
                        price: parseInt(nft.price)
                    }
                }) : []
            })
        }))
        this.setState({ collectionItems: collectionData })
    }

    onBuyNFT = async (itemInfo, idx) => {
        this.setState({
            startProgress: true,
            selectedToken: itemInfo.tokenId
        })
        try {
            const nftContract = await getContract(nftaddress, nftabi.abi)
            const admcContract = await getContract(coinaddress, admcabi.abi)

            const owner = await nftContract.ownerOfToken(this.state.selectedToken)
            const walletAddress = localStorage.getItem('select-address')
            if (String(owner).toLowerCase() === String(walletAddress).toLowerCase()) {
                this.setState({ startProgress: false })
                alert("You can't buy your NFT from marketplace")
                return;
            }

            let tx = await admcContract.approve(nftaddress, itemInfo.price * Math.pow(10, 9))
            await tx.wait()
            tx = await nftContract.buyNFT(this.state.selectedCollection.collectionId, itemInfo.tokenId)
            await tx.wait()

            const updatedItems = this.state.collectionItems.map(collection => collection.collectionId === this.state.selectedCollection.collectionId ? {
                collectionId: parseInt(collection.id),
                name: collection.name,
                tokenURI: collection.tokenURI,
                totalMints: parseInt(collection.totalMints),
                limits: parseInt(collection.limits),
                mintPrice: parseInt(collection.price),
                listNFTs: collection.listNFTs.splice(idx, 1)
            } : collection)

            this.setState({
                startProgress: false,
                collectionItems: updatedItems,
                selectedCollection: {
                    ...this.state.selectedCollection,
                    listNFTs: this.state.selectedCollection.listNFTs.splice(idx, 1)
                }
            })
        } catch (err) {
            this.setState({ startProgress: false })
            console.log(err)
            // alert(err.data.message)
        }
    }

    sleep = async (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    onCollectionItemClick = async (item) => {
        this.setState({
            selectedCollection: item,
            clicked: true
        })
    }

    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/sell-assets">{this.state.data.btnText}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.clicked == false ?
                            this.state.collectionItems.sort((a, b) => { return a.collectionId - b.collectionId })
                                .map((item, idx) => {
                                    return (
                                        <div key={idx} className="col-12 col-sm-6 col-lg-3 item">
                                            <div className="card border-effect ap_anim cursor-pointer">
                                                <div className="image-over" onClick={() => this.onCollectionItemClick(item)}>
                                                    <img className="card-img-top d-block m-auto" src={item.tokenURI} alt="" />
                                                </div>
                                                <div className="card-caption col-12 p-0">
                                                    <div className="card-body">
                                                        <a href="/item-details" className="d-flex justify-content-center">
                                                            <h5 className="mb-0">{item.name}</h5>
                                                        </a>
                                                        <div className="seller align-items-center my-3 d-flex justify-content-center">
                                                            <span>{item.listNFTs.length} / {item.totalMints}</span>
                                                            <span style={{ marginLeft: "20px" }}> limits: {item.limits}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : this.state.selectedCollection.listNFTs.map((item, idx) => {
                                    return (
                                        <div key={idx} className="col-12 col-sm-6 col-lg-3 item">
                                            <div className="card border-effect ap_anim">
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <span>{this.state.selectedCollection.name}</span>
                                                    <span>#{item.tokenId}</span>
                                                </div>
                                                <div className="image-over my-2">
                                                    <img className="card-img-top d-block m-auto" src={this.state.selectedCollection.tokenURI} alt="" />
                                                </div>
                                                <div className="card-caption col-12 p-0">
                                                    <div className="card-body" style={{ padding: "7px" }}>
                                                        {(this.state.startProgress && this.state.selectedToken == item.tokenId) ?
                                                            <div className="col-12" style={{ display: 'flex', justifyContent: "center" }}>
                                                                <CircularProgress />
                                                            </div> : null
                                                        }
                                                        <div className="d-flex justify-content-center">
                                                            {item.price} ADMC
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <Button
                                                                variant="contained"
                                                                className='mt-2'
                                                                style={{ width: "100px" }}
                                                                onClick={() => this.onBuyNFT(item, idx)}
                                                            >Buy</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default SellAssetCmp;