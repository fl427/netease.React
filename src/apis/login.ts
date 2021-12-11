import { get } from "@src/apis/axios";

// 二维码生成
export const getLoginQrKey: any = async (params: any) => {
    return await get<any>('/login/qr/key', params);
}

// 二维码生成
export const getLoginQrCreate: any = async (params: any) => {
    return await get<any>('/login/qr/create', params);
}

// 二维码检测扫码状态 - 轮询
export const getLoginQrCheck: any = async (params: any) => {
    return await get<any>('/login/qr/check', params);
}