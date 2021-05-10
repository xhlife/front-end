import axios from 'axios'

// 每个请求的拦截器方法可能不一样

class AjaxRequest {
    constructor(){
        this.baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';
        this.timeOut = 2000;
    }
    request(data){
        // 确保每次请求都是不同的实例，单独设置拦截器
        const instance = axios.create({
            baseURL: this.baseUrl,
            timeout: this.timeOut
        })
        // 请求拦截器，头部添加token
        instance.interceptors.request.use(config => {
            config.headers.Authorization = localStorage.getItem('token');
            return config
        },err => Promise.reject(err))
        // 响应拦截器
        instance.interceptors.response.use( res => res.data, err => Promise.reject(err))
        
        // 返回一个axios的Promise结果
        return instance(data)
    }
}

export default new AjaxRequest
