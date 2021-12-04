import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAsyncEffect, {test} from '@src/hooks/useAsyncEffect';
import { get, post } from '@src/apis/axios';
import toast from '@src/utils/toast';

// 组件
import Album from '@src/components/Album';
// 接口请求
import {
    getHighQualityPlayListTags,
    getHighQualityPlayList
} from '@src/apis/discovery';
// 类型
import {
    PlayList,
    PlayListTag,
} from '@src/apis/types/discovery'

import './index.scss';

// 初始-全部Tag
const initTag = {
    category: 0,
    hot: true,
    id: 0,
    name: '全部',
    type: 1,
}

// TODO: 把领会的懒加载图片组件加进来，但一定不能直接用他的代码

const Discovery: React.FC = () => {
    const navigate = useNavigate();

    const [playListTags, setPlayListTags] = useState<PlayListTag[]>([]);
    const [currentTag, setCurrentTag] = useState<PlayListTag>(initTag);
    const [playList, setPlayList] = useState<PlayList[]>([]);

    useAsyncEffect(async () => {
        const { tags } = await getHighQualityPlayListTags();
        setPlayListTags([initTag, ...tags.slice(0, 5)]);

        const { playlists } = await getHighQualityPlayList();
        setPlayList(playlists);

        console.log('data222', playlists, tags);
    }, []);

    // 点击前往歌单页面
    const toList = (id: number): void => {
        console.log('to List');
        navigate(`/discovery-list`, {
            state: {
                id
            }
        });
    };

    return (
        <div className={'discovery'}>
            <div className={'discovery-title'}>发现</div>
            <div className={'discovery-tags'}>
                {playListTags.map(tag => (
                    <div className={'discovery-tags-tag'} key={tag.id}>{tag.name}</div>
                ))}
            </div>
            <div className={'discovery-playlist'}>
                {playList.map(list => (
                    <div className={'discovery-playlist-list'} key={list.id}>
                        <Album
                            onClick={() => toList(list.id)}
                            coverImg={list.coverImgUrl}
                            playCount={list.playCount}
                            title={list.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Discovery;