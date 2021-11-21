import React from 'react';
import Layout from "@src/components/Layout";
import Home from "@src/containers/Home";
import Discovery from "@src/containers/Discovery";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discovery" element={<Discovery />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;