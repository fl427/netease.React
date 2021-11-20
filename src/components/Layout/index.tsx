import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import './index.scss';

const Layout: React.FC = ({children}) => {
    return (
        <div className={'page'}>
            <Header />
            <div className={'page-content'}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;