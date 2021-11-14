import React from 'react';
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Discovery from "./containers/Discovery";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="d" element={<Discovery />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App;