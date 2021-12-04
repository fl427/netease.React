import React from 'react';
import Layout from "@src/components/Layout";
import Home from "@src/containers/Home";
import Discovery from "@src/containers/Discovery";
import PlayList from "@src/containers/PlayList";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discovery" element={<Discovery />} />
                    <Route path="/discovery-list" element={<PlayList />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App;