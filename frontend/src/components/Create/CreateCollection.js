import React, { Component } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import eventBus from "../../EventBus";
import { getContract } from '../../export/export';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import { nftaddress } from '../../config';
import nftabi from "../../artifacts/contracts/NFT.sol/NFT.json";
const FormData = require("form-data");

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
            status: 'Only administrator can create a collection',
            image: null,
            metadata: {
                name: '',
                url: '',
                totalCount: 0,
                limitCount: 0,
                price: 0
            }
        };
    }
    onFileChange = async (event) => {
        // await this.preview(event);
        let file = event.target.files[0];
        if (file) {
            let path = URL.createObjectURL(file);
            this.setState({
                selectedFile: file,
                selectedName: file.name,
                fileURL: path
            });
            this.setState(ps => ({ ...ps, image: file }));
        }
    }
    onTextChange = (evt) => {
        if (evt.target.name == "name")
            this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, name: evt.target.value } }));
        else if (evt.target.name == "total_count")
            this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, totalCount: parseInt(evt.target.value) } }));
        else if (evt.target.name == "limit_count")
            this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, limitCount: parseInt(evt.target.value) } }));
        else if (evt.target.name == "price")
            this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, price: parseInt(evt.target.value) } }));
    }
    onRadioClick = (evt) => {
        this.setState({ checkState: evt.target.value });
    }
    getLastItemId = async () => {
        let contract = await getContract(nftaddress, nftabi.abi);
        let lastId = await contract.getTokenCount();
        return lastId;
    }
    sleep = async (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    onUploadFile = async () => {
        var formData = new FormData();
        formData.append('image', this.state.image);

        let hash = await axios.post("http://localhost:5000/create", formData);
        console.log("hash:", hash);
        let imgUrl = `https://gateway.pinata.cloud/ipfs/${hash.data.url}`;
        this.setState(ps => ({ ...ps, metadata: { ...ps.metadata, url: imgUrl } }));
        return hash.data.url;
    }
    onCreateCollection = async () => {
        let contract = await getContract(nftaddress, nftabi.abi);
        if (this.state.metadata.name === '' ||
            this.state.metadata.limitCount === 0 ||
            this.state.metadata.totalCount === 0 ||
            this.state.metadata.price === 0
        ) {
            alert("Please input the specs correctly."); return;
        }

        this.setState({
            startProgress: true,
            status: 'Uploading a NFT item to IPFS Storage... ...'
        });

        let ret = await this.onUploadFile();
        if (ret == null) {
            alert('This metadata had already registered or failed a request to server.');
            this.setState({ startProgress: false });
            return;
        }

        eventBus.dispatch("preview", { link: this.state.metadata });

        try {
            let transaction = await contract.addCollection(
                this.state.metadata.name,
                this.state.metadata.url,
                this.state.metadata.totalCount,
                this.state.metadata.limitCount,
                this.state.metadata.price
            );
            await transaction.wait();
            this.setState({
                startProgress: false,
                status: 'Successfully added a NFT item to IPFS Storage'
            });
        } catch (err) {
            alert(err.message);
        }

    }

    render() {
        return (
            <section className="author-area create_body">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            <AuthorProfile />
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                                <div className="intro-content">
                                    <span>Get Started</span>
                                    <h3 className="mt-3 mb-0">Create Collection</h3>
                                </div>
                            </div>
                            <div className="item-form card no-hover create_item_body">
                                <div className="col-12">
                                    <div className="form-group mt-3" style={{ display: "flex", justifyContent: "center" }}>
                                        <span>{this.state.status}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" onChange={(e) => this.onFileChange(e)} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.selectedName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Item Name" required="required" onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="total_count" placeholder="Total amount of NFT items to mint in this collection" required="required" onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="limit_count" placeholder="Limited amount of NFT items to buy by a player" required="required" onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="price" placeholder="Collection Price" required="required" onChange={this.onTextChange} />
                                        </div>
                                    </div>
                                    {(this.state.startProgress) ?
                                        <div className="col-12" style={{ display: 'flex', justifyContent: "center" }}>
                                            <CircularProgress />
                                        </div> : null
                                    }
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" onClick={this.onCreateCollection}>Create Collection</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Create;