
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    Canceler,
    ResponseType
} from 'axios';

interface SourceProp {
    umet: string;
    cancel: Canceler;
}

const TIMEOUT = 10000;
const MIME_TYPE: IDictionary<ResponseType> = {
    JSON: 'json',
}

const createInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true, // 跨域是否允许携带凭证
        timeout: TIMEOUT, // 设置超时时间
        responseType: MIME_TYPE.JSON,
    });

    let sources: SourceProp[] = []  // 定义数组用于存储每个ajax请求的取消函数及对应标识
    /**
     * 请求防抖当一个url地址被请求多次就会取消前一次请求
     */
    const removeSource = (config: AxiosRequestConfig) => {
        for (let sourceIdx = 0; sourceIdx < sources.length; sourceIdx++) {
            // 当多次请求相同时，取消之前的请求
            if (sources[sourceIdx].umet === config.url + '&' + config.method) {
                sources[sourceIdx].cancel('取消请求');
                sources.splice(sourceIdx, 1);
            }
        }
    }

    /**
     * 请求拦截器
     */
    instance.interceptors.request.use(config => {
        removeSource(config);
        config.cancelToken = new axios.CancelToken((c: Canceler) => {
            // 将取消函数存起来
            sources.push({ umet: config.url + '&' + config.method, cancel: c })
        })
        return config;
    }, error => {
        return Promise.reject(error)
    });

    // 响应拦截器
    instance.interceptors.response.use(config => {
        if (config.data.statusCode >= 3000) {
            // Toast
        }
    }, error => {
        if (!error.response) return;
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空redux中token对象
            // 跳转登录页面
            case 403:
                break;
            // 404请求不存在
            case 404:
                break;
            // 其他错误，直接抛出错误提示
            default:
                break;
        }
        return Promise.reject(error.response);
    });

    return instance;
}

interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
}

const axiosInstance: Instance = createInstance();
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params?: Record<string, string>) {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            params: {
                ...params,
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params: Record<string, string>) {
    return new Promise((resolve, reject) => {
        axiosInstance.post(`${url}`, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

// 对外暴露
export { post, get }