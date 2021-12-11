import { Album, Song } from '@src/apis/types/song';

export interface PlayListSong {
    al?: Album;
    song?: Song;
    id?: number;
    name?: string;
}

/**
 * 歌单相关接口
 */

// 相关歌单推荐
export interface getRelatedPlayListRequest {
    id?: string;
}

// 获取歌单所有歌曲
export interface getPlayListTrackAllRequest {
    id?: string;
    limit?: string;
}

export interface getPlayListTrackAllResponse {
    songs?: PlayListSong[];
    code?: number;
}