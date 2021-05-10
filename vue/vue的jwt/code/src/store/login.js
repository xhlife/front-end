import { login,validate } from "../api/login"

export default {
    state: {
        username: ''
    },
    // mutation由action触发
    mutations: {
        setUsername(state,username){
            state.username = username
        }
    },
    // action 在需要的地方自主触发
    actions: {
        async login({commit},username){
            const r = await login(username)
            if(r.code === 1){
                return Promise.reject(r)
            }
            localStorage.setItem('token',r.token)
            commit("setUsername",r.username)
            return r
        },
        async validate({commit}){
            const r = await validate()
            if (r.code === 1) {
                return false
            }
            // 如果当前处于登录状态
            commit("setUsername", r.username)
            localStorage.setItem('token',r.token)
            return true
        }
    }
}
