import React, { useEffect } from 'react';
import axios from 'axios';
import { get, post } from '@src/apis/index';
import './index.scss';

const Discovery: React.FC = () => {

    // 获取精品歌单
    const getHighQualityPlayList = async () => {
        let data = await get('/top/playlist/highquality', {});
        console.log('list', data);
    }

    // 初始化
    useEffect(() => {
        getHighQualityPlayList();
    }, []);

    return (
        <div className={'discovery'}>
            Discovery
        </div>
    )
};

export default Discovery;