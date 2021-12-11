import { ADD_TO_PLAYLIST, CHANGE_PLAY_IDX } from './actions';
import { AnyAction } from 'redux';
import { Track } from '@src/types/index'

export interface SongListState {
    tracks: Track[];
    idx: number;
}
const initialSong: SongListState = {
    tracks: [
        {
            title: '飘扬过海来看你',
            author: '周深',
            album: '',
            audioSrc: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_93477122&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3'
        },{
            title: 'Nubia',
            author: '周深',
            album: '',
            audioSrc: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_140162434&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
        },
    ],
    idx: 0,
}

interface SongAction {
    type: string;
    payload: Track | number;
}

const songReducer = (state = initialSong, action: AnyAction) => {
    switch (action.type) {
        case ADD_TO_PLAYLIST:
            return {
                ...state,
                tracks: [...state.tracks, action.payload],
                idx: 3
            }
        case CHANGE_PLAY_IDX:
            return {
                ...state,
                idx: action.payload
            }
        default:
            return state;
    }
}

export default songReducer;