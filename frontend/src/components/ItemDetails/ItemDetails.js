import React, { Component } from 'react';

const initData = {
    itemImg: "/img/auction_2.jpg",
    date: "2022-03-30",
    tab_1: "Bids",
    tab_2: "History",
    tab_3: "Details",
    ownerImg: "/img/avatar_1.jpg",
    itemOwner: "Themeland",
    created: "15 Jul 2021",
    title: "Walking On Air",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",
    highest_bid: "2.9 BNB",
    bid_count: "1 of 5",
    btnText: "Place a Bid"
}

const tabData_1 = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        price: "14 ETH",
        time: "4 hours ago",
        author: "@arham"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        price: "10 ETH",
        time: "8 hours ago",
        author: "@junaid"
    },
    {
        id: "3",
        img: "/img/avatar_3.jpg",
        price: "12 ETH",
        time: "3 hours ago",
        author: "@yasmin"
    }
]

const tabData_2 = [
    {
        id: "1",
        img: "/img/avatar_6.jpg",
        price: "32 ETH",
        time: "10 hours ago",
        author: "@hasan"
    },
    {
        id: "2",
        img: "/img/avatar_7.jpg",
        price: "24 ETH",
        time: "6 hours ago",
        author: "@artnox"
    },
    {
        id: "3",
        img: "/img/avatar_8.jpg",
        price: "29 ETH",
        time: "12 hours ago",
        author: "@meez"
    }
]

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]

class ItemDetails extends Component {
    state = {
        initData: {},
        tabData_1: [],
        tabData_2: [],
        sellerData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            tabData_1: tabData_1,
            tabData_2: tabData_2,
            sellerData: sellerData
        })
    }
    render() {
        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className="item-thumb text-center">
                                    <img src={this.state.initData.itemImg} alt="" />
                                </div>
                                {/* <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div> */}
                                
                                {/* Tab Content */}
                                <div className="tab-content" id="nav-tabContent">
                                    {/* <div className="tab-pane fade show active" id="nav-home">
                                        <ul className="list-unstyled">
                                            {this.state.tabData_1.map((item, idx) => {
                                                return (
                                                    <li key={`tdo_${idx}`} className="single-tab-list d-flex align-items-center">
                                                        <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                        <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile">
                                        <ul className="list-unstyled">
                                            
                                            {this.state.tabData_2.map((item, idx) => {
                                                return (
                                                    <li key={`tdt_${idx}`} className="single-tab-list d-flex align-items-center">
                                                        <img className="avatar-sm rounded-circle mr-3" src={item.img} alt="" />
                                                        <p className="m-0">Bid listed for <strong>{item.price}</strong> {item.time} <br />by <a href="/author">{item.author}</a></p>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div> */}
                                    <div className="tab-pane fade" id="nav-contact">
                                        {/* Single Tab List */}
                                        <div className="owner-meta d-flex align-items-center mt-3">
                                            <span>Owner</span>
                                            <a className="owner d-flex align-items-center ml-2" href="/author">
                                                <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                                <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                            </a>
                                        </div>
                                        <p className="mt-2">Created : {this.state.initData.created}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 className="m-0">{this.state.initData.title}</h3>
                                <p>{this.state.initData.content}</p>
                                {/* Owner */}
                                {/* <div className="owner d-flex align-items-center">
                                    <span>Owned By</span>
                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                        <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                        <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                    </a>
                                </div> */}
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        <li className="price d-flex justify-content-between">
                                            <span>Current Price {this.state.initData.price_1}</span>
                                            <span>{this.state.initData.price_2}</span>
                                            <span>{this.state.initData.count}</span>
                                        </li>
                                        <li>
                                            <span>Size </span>
                                            <span>{this.state.initData.size}</span>
                                        </li>
                                        <li>
                                            <span>Volume Traded </span>
                                            <span>{this.state.initData.volume}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className="row items">
                                    {this.state.sellerData.map((item, idx) => {
                                        return (
                                            <div key={`sd_${idx}`} className="col-12 col-md-6 item px-lg-2">
                                                <div className="card no-hover">
                                                    <div className="single-seller d-flex align-items-center">
                                                        <a href="/author">
                                                            <img className="avatar-md rounded-circle" src={item.img} alt="" />
                                                        </a>
                                                        <div className="seller-info ml-3">
                                                            <a className="seller mb-2" href="/author">{item.seller}</a>
                                                            <span>{item.post}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="col-12 item px-lg-2">
                                        <div className="card no-hover">
                                            <h4 className="mt-0 mb-2">Highest Bid</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>{this.state.initData.highest_bid}</span>
                                                <span>{this.state.initData.bid_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">{this.state.initData.btnText}</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ItemDetails;