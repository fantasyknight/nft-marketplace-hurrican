import React, { Component } from 'react';

const initData = {
    pre_heading: "Auctions",
    heading: "Live Auctions",
    btnText: "View All"
}

const data = [
    {
        id: "1",
        img: "/img/auction_1.jpg",
        date: "2021-12-09",
        title: "Virtual Worlds",
        seller_thumb: "/img/avatar_1.jpg",
        seller: "@Richard",
        price: "1.5 BNB",
        count: "1 of 1"
    },
    {
        id: "2",
        img: "/img/auction_2.jpg",
        date: "2021-10-05",
        title: "Collectibles",
        seller_thumb: "/img/avatar_2.jpg",
        seller: "@JohnDeo",
        price: "2.7 BNB",
        count: "1 of 1"
    },
    {
        id: "3",
        img: "/img/auction_3.jpg",
        date: "2021-09-15",
        title: "Arts",
        seller_thumb: "/img/avatar_3.jpg",
        seller: "@MKHblots",
        price: "2.3 BNB",
        count: "1 of 1"
    },
    {
        id: "4",
        img: "/img/auction_4.jpg",
        date: "2021-12-29",
        title: "Robotic Arts",
        seller_thumb: "/img/avatar_4.jpg",
        seller: "@RioArham",
        price: "1.8 BNB",
        count: "1 of 1"
    },
    {
        id: "5",
        img: "/img/auction_5.jpg",
        date: "2022-01-24",
        title: "Design Illusions",
        seller_thumb: "/img/avatar_5.jpg",
        seller: "@ArtNox",
        price: "1.7 BNB",
        count: "1 of 1"
    },
    {
        id: "6",
        img: "/img/auction_6.jpg",
        date: "2022-03-30",
        title: "Photography",
        seller_thumb: "/img/avatar_6.jpg",
        seller: "@Junaid",
        price: "3.5 BNB",
        count: "1 of 1"
    }
]

class AuctionsOne extends Component {
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
            <section className="live-auctions-area">
                
            </section>
        );
    }
}

export default AuctionsOne;