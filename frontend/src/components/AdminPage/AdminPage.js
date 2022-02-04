import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { getContract } from '../../export/export';
import { nftaddress } from '../../config';
import nftabi from "../../artifacts/contracts/NFT.sol/NFT.json";
import marketabi from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Selector from '../Selector/Select';
import axios from 'axios';

const initData = {
    pre_heading: "Administrator",
    heading: "Only admin can set up specific items",
    content: "Please set price with ADMC coin."
}

class AdminPage extends Component {
    state = {
        initData: {},
        mintingPrice: 0,
        listingPrice: 0,
        buyingFee: 0.0,
        accountAddress: '',
        items: [],
        selectedItem: [],
        selectedFile: null
    }

    componentDidMount = async () => {
        let contract = await getContract(nftaddress, nftabi.abi);
        let collectionItems = await contract.fetchCollections();
        let citems = collectionItems.map((item) => {
            return item.name
        });
        this.setState({
            initData: initData,
            items: citems
        });
    }

    onTextChange = (evt) => {
        let name = evt.target.name;
        if (name == "minting-price") {
            this.setState({ mintingPrice: parseInt(evt.target.value) });
        } else if (name == "listing-price") {
            this.setState({ listingPrice: parseInt(evt.target.value) });
        } else if (name == "account-address") {
            this.setState({ accountAddress: evt.target.value });
        }
    }

    onSet = async (evt) => {
        let name = evt.target.name;
        if (name == "minting-price") {
            let contract = await getContract(nftaddress, nftabi.abi);
            if (this.state.mintingPrice >= 100 && this.state.mintingPrice <= 1000000) {
                let transaction = await contract.setMintingPrice(this.state.mintingPrice);
                await transaction.wait();
            } else {
                alert('Please set minting price again.'); return;
            }
        } else if (name == "listing-price") {
            let contract = await getContract(nftaddress, nftabi.abi);
            if (this.state.listingPrice >= 100 && this.state.listingPrice <= 5000000) {
                let transaction = await contract.setListingPrice(this.state.listingPrice);
                await transaction.wait();
            } else {
                alert('Please set listing price again.'); return;
            }
        } else if (name == "whitelist") {
            alert("whitelist");
        }
    }

    handleChange = (event) => {
        this.setState({
            selectedItem: event.target.value
        });
    }

    getId = (item) => {
        let items = this.state.items;
        let i;
        for (i = 0; i < items.length; i++)
            if (item == items[i]) break;
        return i + 1;
    }

    addWhiteList = async () => {

    }

    onUploadFile = async () => {
        var formData = new FormData();
        formData.append('image', this.state.image);

        let wallets = await axios.post("http://localhost:5000/load", formData);
        console.log(wallets);
    }

    onFileChange = (evt) => {
        let file = evt.target.files[0];
        if (file) this.setState({ image: file });
    }

    render() {
        return (
            <section className="author-area create_body">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                            {/* Item Form */}
                            <div id="contact-form" className="item-form card no-hover" method="POST" style={{ backgroundColor: "#171d38" }}>
                                <div className="row">
                                    <div className="col-10">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="listing-price" placeholder="Listing Price(100 ~ 5M ADMC)" onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <Button variant="contained" name="listing-price" style={{ marginTop: "21px" }} onClick={this.onSet}>Set</Button>
                                    </div>
                                </div>
                            </div>
                            <div id="contact-form" className="item-form card no-hover mt-5" method="POST" style={{ backgroundColor: "#171d38" }}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" placeholder="Please select a file" onChange={(e) => this.onFileChange(e)} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.selectedName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <Selector name="collection_type" selectorName="Collection Type" items={this.state.items} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" onClick={this.addWhiteList}>Add WhiteList</button>
                                    </div>
                                </div>
                            </div>
                            <p className="form-message" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AdminPage;