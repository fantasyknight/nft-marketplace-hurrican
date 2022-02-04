import React, { Component } from 'react';

import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Explore from '../Explore/ExploreFive';
import Footer from '../Footer/Footer';
import ModalSearch from '../Modal/ModalSearch';
import ModalMenu from '../Modal/ModalMenu';
import Scrollup from '../Scrollup/Scrollup';

class ExploreFour extends Component {
    render() {
        return (
            <div className="main" style={{backgroundColor:"#76a103"}}>
                <Header />
                <Breadcrumb title="My Assets" subpage="MyAssets" />
                <Explore />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreFour;