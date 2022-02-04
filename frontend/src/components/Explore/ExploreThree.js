import React, { Component } from 'react';

const initData = {
    pre_heading: "Explore",
    heading: "Exclusive Digital Assets",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    filter_1: "All",
    filter_2: "Art",
    filter_3: "Music",
    filter_4: "Collectibles",
    filter_5: "Sports"
}

const data = [
    {
        id: "1",
        img: "/img/auction_1.jpg",
        group: '["art","sports"]',
        title: "Walking On Air",
        owner: "Richard",
        price: "1.5 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "2",
        img: "/img/auction_2.jpg",
        group: '["collectibles","sports"]',
        title: "Domain Names",
        owner: "John Deo",
        price: "2.7 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "3",
        img: "/img/auction_3.jpg",
        group: '["art","music"]',
        title: "Trading Cards",
        owner: "Arham",
        price: "2.3 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "4",
        img: "/img/auction_4.jpg",
        group: '["sports","art","music"]',
        title: "Industrial Revolution",
        owner: "Yasmin",
        price: "1.8 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "5",
        img: "/img/auction_5.jpg",
        group: '["music","sports","collectibles"]',
        title: "Utility",
        owner: "Junaid",
        price: "1.7 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "6",
        img: "/img/auction_6.jpg",
        group: '["collectibles","sports"]',
        title: "Sports",
        owner: "ArtNox",
        price: "1.9 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "7",
        img: "/img/auction_7.jpg",
        group: '["art","sports"]',
        title: "Cartoon Heroes",
        owner: "Junaid",
        price: "3.2 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "8",
        img: "/img/auction_8.jpg",
        group: '["music","sports","art","collectibles"]',
        title: "Gaming Chair",
        owner: "Johnson",
        price: "0.69 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "9",
        img: "/img/auction_9.jpg",
        group: '["music","sports","collectibles"]',
        title: "Photography",
        owner: "Sara",
        price: "2.3 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "10",
        img: "/img/auction_10.jpg",
        group: '["art","music"]',
        title: "Zed Run",
        owner: "SpaceMan",
        price: "3.7 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "11",
        img: "/img/auction_11.jpg",
        group: '["sports","art","music"]',
        title: "Rare Tyres",
        owner: "Monas",
        price: "2.2 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    },
    {
        id: "12",
        img: "/img/auction_12.jpg",
        group: '["music","sports","collectibles"]',
        title: "World of Women",
        owner: "Victor",
        price: "4.3 ETH",
        count: "1 of 1",
        btnText: "Place a Bid"
    }
]

class ExploreThree extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: data
        })
    }
    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mb-4">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-12">
                            {/* Explore Menu */}
                            <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                                <label className="btn active d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                    <span>{this.state.initData.filter_1}</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="art" className="explore-btn" />
                                    <span>{this.state.initData.filter_2}</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="music" className="explore-btn" />
                                    <span>{this.state.initData.filter_3}</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="collectibles" className="explore-btn" />
                                    <span>{this.state.initData.filter_4}</span>
                                </label>
                                <label className="btn d-table text-uppercase p-2">
                                    <input type="radio" defaultValue="sports" className="explore-btn" />
                                    <span>{this.state.initData.filter_5}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row items explore-items">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Owned By</span>
                                                    <a href="/author">
                                                        <h6 className="ml-2 mb-0">{item.owner}</h6>
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price}</span>
                                                    <span>{item.count}</span>
                                                </div>
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />{item.btnText}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default ExploreThree;