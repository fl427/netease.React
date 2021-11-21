import React from 'react';
// import Module from "../../components/Module";
import Module from "@src/components/Module/index";
import "./index.scss";

const Home: React.FC = () => {

    const searchHot = async () => {
        console.log('热搜');
        let res = await fetch('api/search/hot');
        console.log('结束', res);
    }
    return (
        <div className={'home'}>
            <div className={'home-star'}>
                <Module title={'By Apple Music'} onClick={searchHot} />
            </div>
            <div className={'home-recommend'}>
                <Module title={'推荐歌单'} />
            </div>
        </div>
    )
};

export default Home;