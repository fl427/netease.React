import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAsyncEffect from '@src/hooks/useAsyncEffect';
import { getRelatedPlayList, getPlayListTrackAll } from '@src/apis/playlist';
import { getSongUrl } from '@src/apis/song';
import './index.scss';
import { PlayListSong } from '@src/apis/types/playlist';
import { useSelector, useDispatch } from 'react-redux';
import { SongListState } from '@src/redux/reducers';
import { ADD_TO_PLAYLIST, CHANGE_PLAY_IDX } from '@src/redux/actions';

const PlayList: React.FC = () => {
    const { id, coverImg, title } = useLocation().state;
    console.log('id', coverImg);

    const [listSongs, setListSongs] = useState<PlayListSong[]>([]);

    useAsyncEffect(async () => {
        const { songs = [] } = await getPlayListTrackAll({ id });
        setListSongs(songs);
        console.log('response', songs);
        const response = await getSongUrl({ id: songs[0].id });
        console.log('response2', response);
    }, []);

    const dispatch = useDispatch();

    const handleClickSong = async (id?: number) => {
        const { data = [] } = await getSongUrl({ id });
        console.log('ssss', data);
        const track = {
            title: '新歌',
            author: '歌手',
            album: '',
            audioSrc: data[0].url
        }
        dispatch({ type: ADD_TO_PLAYLIST, payload: track });
    }

    return (
        <div className={'playlist'}>
            <div className={'playlist-album'}>
                <img src={coverImg} className={'playlist-album-coverimg'}/>
                <div className={'playlist-album-info'}>
                    <div className={'title'}>{title}</div>
                </div>
            </div>
            <div className={'playlist-list'}>
                {listSongs.map(listSong => (
                    <div className={'playlist-list-song'} key={listSong.id} onClick={() => handleClickSong(listSong.id)}>
                        <div className={'info'}>
                            <img className={'cover-img'} src={coverImg} />
                            <div className={'album'}>
                                <div className={'title'}>{listSong.name}</div>
                                <div className={'author'}>Josh Turner</div>
                            </div>
                        </div>
                        <div className={'track-name'}>Your name</div>
                        <div className={'duration'}>3:33</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayList;