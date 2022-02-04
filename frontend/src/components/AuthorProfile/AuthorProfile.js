import React, { Component } from 'react';
import axios from 'axios';
import eventBus from "../../EventBus";

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

class AuthorProfile extends Component {
    state = {
        data: { 
            name: '', 
            img: null,
            authorImg: null,
            totalCount: 0,
            limitCount: 0
        }        
    }
    componentDidMount(){
        eventBus.on("preview", (data) => this.previewPicture(data));
        // eventBus.on("key", (data) => this.setKey(data));
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        .catch(err => console.log(err))
    }
    componentWillUnmount() {
        eventBus.remove("preview");
        // eventBus.remove("key");
    }
    previewPicture(data) {
        console.log("==== recieved ========");
        console.log(data);
        let mydata = this.state.data;
        mydata.img = data.link.url;
        mydata.authorImg = data.link.url;
        mydata.name = data.link.name;
        mydata.totalCount = data.link.totalCount;
        mydata.limitCount = data.link.limitCount;
        this.setState({data: mydata});
    }
    render() {
        return (
            <div className="card no-hover text-center ap_body ap_anim">
                <div className="image-over">
                    <img className="card-img-top" src={this.state.data.img} alt="" />
                    {/* Author */}
                    <div className="author">
                        <div className="author-thumb avatar-lg">
                            <img className="rounded-circle" src={this.state.data.authorImg} alt="" />
                        </div>
                    </div>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body mt-4">
                        <h5 className="mb-3">Name: {this.state.data.name}</h5>
                        <h5 className="mb-3">Total Supply: {this.state.data.totalCount}</h5>
                        <h5 className="mb-3">Limited Count: {this.state.data.limitCount}</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorProfile;