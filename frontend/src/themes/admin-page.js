import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import AdminPage from '../components/AdminPage/AdminPage';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class AdminCmp extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Admin Page" subpage="Pages" page="Administrator" />
                <AdminPage />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default AdminCmp;