import axios from "axios";
import { Toast } from 'vant';

// 设置请求头
let headers = {
    // Authorization: 'Bearer ' + localStorage.getItem('access_token')
};

//过滤请求
axios.interceptors.request.use(
    config => {
        config.headers = headers;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        if(response.config.method === 'post') {
            if(response.data.data && response.data.data.type === 'success') {
                Toast.success(response.data.data.message)
            } else if(response.data.data.type === 'error') {
                Toast.fail(response.data.data.message)
            } else if(response.data.data.type === 'info') {
                Toast(response.data.data.message)
            }
        }
        return Promise.resolve(response.data);
    },
    error => {
        if (error && error.response) {
            if(error.response.status === 401) {

            } 
            let res = {code: null};
            res.code = error.response.status;
            return Promise.reject(res);
        }
        return Promise.reject(error);
    }
);

export default function request(method, url, data) {
    method = method.toLocaleLowerCase();
    if (method === "post") {
        return axios.post(url, data);
    } else if (method === "get") {
        return axios.get(url, {
            params: data
        });
    } else if (method === "delete") {
        return axios.delete(url, {
            params: data
        });
    } else if(method === 'put') {
        return axios.put(url, data)
    }
}
