import React, { Component } from 'react';
import axios from 'axios';
import { Padding } from '@mui/icons-material';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-2/footer";

class Footer extends Component {
    state = {
        data: {},
        socialData: [],
        widgetData_1: [],
        widgetData_2: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    socialData: [
                        {
                            "id": 1,
                            "link": "facebook",
                            "href": "https://www.facebook.com/AdamantCoinADMC",
                            "icon": "fab fa-facebook-f"
                        },
                        {
                            "id": 2,
                            "link": "twitter",
                            "href": "https://twitter.com/adamantcoin",
                            "icon": "fab fa-twitter"
                        },
                        {
                            "id": 3,
                            "link": "instagram",
                            "href": "https://www.instagram.com/adamant.coin/?hl=en",
                            "icon": "fab fa-instagram"
                        },
                        {
                            "id": 3,
                            "link": "instagram",
                            "href": "https://discord.com/invite/7neaaNPmg9",
                            "icon": "fab fa-discord"
                        }

                    ],
                    widgetData_1: res.data.widgetData_1,
                    widgetData_2: res.data.widgetData_2
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <footer className="footer-area footer-body">
                {/* Footer Top */}
                <style>
                    
                </style>
                <center>
                <a className="navbar-brand" href="/" style={{width : "104px",marginTop:"40px"}}>
                    <img src={this.state.data.img} alt="" />
                </a>
                <p>Adamant is a frictionless, yield-generating contract that aims to let the community participate in charity work.</p>
                <div>
                {this.state.socialData.map((item, idx) => {
                    return (
                        <a key={`sd_${idx}`} className={item.link} href={item.href} style={{fontSize : "44px",margin:"40px",marginBottom:"40px"}}>
                            <i className={item.icon} />
                        </a>
                    );
                })}
                </div>              
                </center>

                {/* Footer Bottom */}
                
                <div className="footer-bottom" style={{marginTop:"20px"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Copyright Area */}
                                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                    {/* Copyright Left */}
                                    <div className="copyright-left" >©2021 ADAMANT COIN</div>
                                    {/* Copyright Right */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;