import React, { Component } from 'react';
import eventBus from "../../EventBus";
import { getContract } from '../../export/export';
import CircularProgress from '@mui/material/CircularProgress';
import Selector from '../Selector/Select';

import { nftmarketaddress, nftaddress, coinaddress } from '../../config';
import admcabi from "../../artifacts/contracts/Adamant.sol/Adamant.json";
import nftabi from "../../artifacts/contracts/NFT.sol/NFT.json";
import marketabi from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            selectedName: "Choose file",
            fileURL: null,
            count: 0,
            startProgress: false,
            checkState: 1,
            status: "Choose which Shiba you'll mint!",
            items: [],
            metadata: {
                collectionId: 0,
                auctionInterval: 0
            }
        };
    }

    async componentDidMount() {
        let types = await this.getCollectionTypes();
        console.log(types)
        this.setState({ items: types });
    }

    componentWillUnmount() {
    }

    onTextChange = (evt) => {
        if (evt.target.name == "auction_interval")
            this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, auctionInterval: parseInt(evt.target.value) } }));
    }

    onRadioClick = (evt) => {
        this.setState({ checkState: evt.target.value });
    }

    onHandleChange = (evt) => {
        console.log(parseInt(evt.target.value));
        this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, collectionId: parseInt(evt.target.value) } }));
        this.onMintNFT(parseInt(evt.target.value));
    }

    getLastItemId = async () => {
        let contract = await getContract(nftaddress, nftabi.abi);
        let lastId = await contract.getTokenCount();
        return lastId;
    }

    sleep = async (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    getCollectionTypes = async () => {
        let contractToken = await getContract(nftaddress, nftabi.abi);
        let collections = await contractToken.fetchCollections();
        let items = await Promise.all(collections.map(async (collection) => {
            return {
                id: collection.id,
                name: collection.name,
                uri: collection.collectionUri,
                price: parseInt(collection.price)
            }
        }));
        return items
    }

    onMintNFT = async (cid) => {

        if (cid < 1) {
            alert("Please choose a collection type"); return;
        }
        const contractNft = await getContract(nftaddress, nftabi.abi);
        const contractCoin = await getContract(coinaddress, admcabi.abi);

        const collectionInfo = await contractNft.getCollectionInfoByCid(cid);
        const currentMints = await contractNft.getOwnerTokenCountForCollection(cid);
        const currentCount = await contractNft.getCollectionTokenCount(cid);
        if (collectionInfo.limits.toNumber() <= currentMints.toNumber()) {
            alert("Current Owned Count exceeds the limited number of minting."); return;
        }
        if (collectionInfo.totalMints.toNumber() <= currentCount.toNumber()) {
            alert("Current minting count overflows total supply for this collection."); return;
        }

        let owner = await contractNft.getOwner();
        owner = String(owner).toString().toLowerCase();
        const selected = localStorage.getItem('select-address').toLowerCase();
        if (selected === owner) {
            alert('admin cant mint a nft item and create a market item.'); return;
        }

        this.setState({
            startProgress: true,
            status: 'Approving from NFT contract'
        });

        let transaction = await contractCoin.approve(nftaddress, collectionInfo.price * Math.pow(10, 9));
        let tx = await transaction.wait();

        this.setState({
            status: 'Minting an NFT Item'
        });
        transaction = await contractNft.mintToken(cid);
        tx = await transaction.wait();

        eventBus.dispatch("balance-changed", { account: localStorage.getItem('select-address') });

        this.setState({
            startProgress: false,
            status: 'Successfully Completed'
        });
    }

    sayHello(name) {
        alert(`hello, ${name}`);
    }

    render() {
        return (
            <section className="author-area create_body" style={{ backgroundColor: "#76a103" }}>

                {(this.state.startProgress) ?
                    <div className="screenStatus">
                        <div className="form-group mt-3" style={{ display: "flex", justifyContent: "center", position: "absolute", marginLeft: "-5.88%" }}>
                            <span style={{ color: "#ffffff" }}>{this.state.status}</span>
                        </div>
                        <div className="col-12" style={{ position: "absolute", margin: "3% 0% 0% -2.1%" }}>
                            <CircularProgress />
                        </div>
                    </div> : null
                }

                <div className="container">
                    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="col-12 col-md-6" style={{ maxWidth: "100%", flex: "0 0 100%" }}>
                            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5" style={{ position: "relative" }}>
                                <div className="intro-content">
                                    {/* <span>Get Started</span> */}
                                    <h3 className="mt-3 mb-0">Create NFT</h3>
                                </div>
                            </div>
                            <div className="nftrow">
                                {this.state.items.map((item, idx) => {
                                    return (
                                        <div className="nftcard" key={idx}>
                                            <img src={item.uri} alt={item.name} style={{ width: "189px", height: "162px" }} />
                                            <div className="nftbanner"> {item.name} </div>
                                            <div className="nftprice"> {`${item.price} ADMC`} </div>
                                            <div className="nftcontainer">
                                                <button value={idx + 1} className="btn w-100 mt-3 mt-sm-4" onClick={this.onHandleChange} style={{ color: "#6b3705", backgroundColor: "#78f93f", marginBottom: "-20px" }}>Create NFT</button>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Create;