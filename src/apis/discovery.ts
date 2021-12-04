import { get } from "@src/apis/axios";

import {
    getHighQualityPlayListTagsResponse,
    getHighQualityPlayListRequest,
    getHighQualityPlayListResponse,
} from '@src/apis/types/discovery';

type GetHighQualityPlayListTags = () => Promise<getHighQualityPlayListTagsResponse>
type GetHighQualityPlayList = (params?: getHighQualityPlayListRequest) => Promise<getHighQualityPlayListResponse>

// 获取精品歌单标签列表
export const getHighQualityPlayListTags: GetHighQualityPlayListTags = async () => {
    return await get('/playlist/highquality/tags');
}

// 获取精品歌单
export const getHighQualityPlayList: GetHighQualityPlayList = async (params) => {
    return await get<getHighQualityPlayListRequest>('/top/playlist/highquality', params);
}