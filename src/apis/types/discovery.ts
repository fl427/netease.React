// 精品歌单标签
export interface PlayListTag {
    category: number;
    hot: boolean;
    id: number;
    name: string;
    type: number;
}

// 歌单创建人
export interface PlayListCreator {
    accountStatus: number;
    anchor: boolean;
    authStatus: number;
    authenticationTypes: number;
    authority: number;
    avatarDetail: {
        userType: number;
        identityLevel: number;
        identityIconUrl: string;
    }
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    expertTags: string[]
    experts: any;
    followed: boolean;
    gender: number;
    mutual: boolean;
    nickname: string;
    province: number;
    remarkName: any;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

// 精品歌单
export interface PlayList {
    adType: number;
    anonimous: boolean;
    cloudTrackCount: number;
    commentCount: number;
    commentThreadId: string;
    copywriter: string;
    coverImgId: number;
    coverImgId_str: string;
    coverImgUrl: string;
    coverStatus: number;
    createTime: number;
    creator: PlayListCreator;
    description: string;
    highQuality: boolean;
    id: number;
    name: string;
    newImported: boolean;
    ordered: boolean;
    playCount: number;
    privacy: number;
    recommendInfo: any;
    shareCount: number;
    specialType: number;
    status: number;
    subscribed: any;
    subscribedCount: number;
    subscribers: any[];
    tags: string[]
    totalDuration: number;
    trackCount: number;
    trackNumberUpdateTime: number;
    trackUpdateTime: number;
    tracks: any;
    updateTime: number;
    userId: number;
}

/**
 * Discovery接口请求
 */

export interface getHighQualityPlayListTagsResponse {
    tags: PlayListTag[];
    code: number;
}

export interface getHighQualityPlayListRequest {
    tag?: number;
    limit?: number;
    before?: number;
}

export interface getHighQualityPlayListResponse {
    code: number;
    lasttime: number;
    more: boolean;
    playlists: PlayList[];
    total: number;
}