// Set config defaults when creating the instance
//自定义实例默认值
import axios, {AxiosInstance} from "axios";

const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,  // 确保这个设置存在
    timeout: 5000,
});

myAxios.defaults.withCredentials = true; //配置为true,表示每次发送请求时携带cookie

//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(
    config => {
        // 从cookie中获取csrftoken
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)?.[1];
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("请求收到了了",response)
    // 未登录到
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
