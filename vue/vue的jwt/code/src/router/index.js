import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      needLogin: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 不需要登录的白名单
const whiteList = ['/']
router.beforeEach(async (to,from,next) => {
  if(whiteList.includes(to.path)){
    return next();
  }
  // 验证当前是否处于登录状态
  const flag = await store.dispatch('validate');
  if(flag){
    // 登录过
    if(to.path === '/login'){
      next('/')
    }else{
      next()
    }
  }else{
    // 没有登录过
    const flag = to.matched.some( item => item.meta.needLogin)
    if(flag){
      next({
        path: "/login",
        query: { redirect: to.path }, // 用于用户登录后跳转到之前的页面
      });
    }else{
      next()
    }
  }
  next()
})


export default router
