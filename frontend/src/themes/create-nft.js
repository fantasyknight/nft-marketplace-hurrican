import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import NFT from '../components/Create/CreateNFT';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class CreateNFT extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Create" subpage="Pages" page="Create" />
                <NFT />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default CreateNFT;