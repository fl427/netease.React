import { get } from "@src/apis/axios";

import {
    getSongUrlRequest,
    getSongUrlResponse,
} from '@src/apis/types/song';

type GetSongUrl = (params?: getSongUrlRequest) => Promise<getSongUrlResponse>

// 获取音乐url
export const getSongUrl: GetSongUrl = async (params) => {
    return await get('/song/url', params);
}