export interface Song {
    id?: number;
    url?: string;
    md5?: string;
}

export interface Album {
    id?: number;
    name?: string;
    pic?: number;
    picUrl?: string;
    pic_str?: string;
}


// 获取音乐url
export interface getSongUrlRequest {
    id?: number;
    br?: string;
}

export interface getSongUrlResponse {
    code?: number;
    data?: Song[];
}