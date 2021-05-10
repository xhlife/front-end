import axiosAjax from '../libs/request'
// console.log(axiosAjax);

// 登录接口
export const login = username => axiosAjax.request({
    url: '/login',
    method: 'POST',
    data: {username}
})

// 验证登录接口
export const validate = () => axiosAjax.request({
    url: '/validate'
})


