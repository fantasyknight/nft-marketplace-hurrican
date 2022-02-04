import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Collection from '../components/Create/CreateCollection';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class CreateCollection extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Create" subpage="Pages" page="Create" />
                <Collection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default CreateCollection;