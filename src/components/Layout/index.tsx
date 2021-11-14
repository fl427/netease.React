import React from "react";
import Header from "./Header";
import './index.scss';

const Layout: React.FC = ({children}) => {
    return (
        <div className={'page'}>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default Layout;