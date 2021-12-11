import React from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from "@src/components/Layout";
import Home from "@src/containers/Home";
import Discovery from "@src/containers/Discovery";
import PlayList from "@src/containers/PlayList";
import Login from "@src/containers/Login";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} timeout={1000}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/discovery" element={<Discovery />} />
                            <Route path="/discovery-list" element={<PlayList />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default App;