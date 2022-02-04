import React, { Component } from 'react';

import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SellAssetCmp from '../Explore/ExploreTwo';
import Footer from '../Footer/Footer';
import ModalSearch from '../Modal/ModalSearch';
import ModalMenu from '../Modal/ModalMenu';
import Scrollup from '../Scrollup/Scrollup';

class SellAssets extends Component {
    render() {
        return (
            <div className="main" style={{backgroundColor:"#76a103"}}>
                <Header />
                <Breadcrumb title="Sell Assets" subpage="Sell Assets" />
                <SellAssetCmp />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default SellAssets;