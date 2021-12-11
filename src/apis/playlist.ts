import { get } from "@src/apis/axios";

import {
    getRelatedPlayListRequest,
    getPlayListTrackAllRequest,
    getPlayListTrackAllResponse,
} from '@src/apis/types/playlist';

type GetPlayListTrackAll = (params?: getPlayListTrackAllRequest) => Promise<getPlayListTrackAllResponse>

// 相关歌单推荐
export const getRelatedPlayList = async (params: getRelatedPlayListRequest) => {
    return await get<getRelatedPlayListRequest>('/related/playlist', params);
}

// 获取歌单所有歌曲
export const getPlayListTrackAll: GetPlayListTrackAll = async (params) => {
    return await get<getPlayListTrackAllRequest>('/playlist/track/all', params);
}