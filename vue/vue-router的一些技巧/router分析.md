vue-router作为vue的插件，我们需要了解它的原理，方便日常开发

从基本的用法，分析执行步骤

```js
import Vue from "vue"
import VueRouter from "vue-router"

const router = new VueRouter({
  mode: "hash",
  routes: [] // 路由数组
})
Vue.use(Router)
new Vue({
  el: "#app",
  router,
  components: {App},
  render: h => h(App)
})
```
### `第一步 new VueRouter(...)`
直接看router的构造函数(下面代码经过删减，只保留 构造函数和init方法)
创建实例的时候，执行了 `createMatcher()` 和 `new HashHistory`
至于 init方法，按执行顺序的话，暂时还没到，后面再看
```js
export default class VueRouter {
  constructor (options: RouterOptions = {}) {
    if (process.env.NODE_ENV !== 'production') {
      warn(this instanceof VueRouter, `Router must be called with the new operator.`)
    }
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    // options 就是{mode: "history",routes:[]}这个对象
    // this 就是 const router = new VueRouter() 的router 
    this.matcher = createMatcher(options.routes || [], this)

    let mode = options.mode || 'hash'
    this.fallback =
      mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    // 三个模式都继承自History这个类
    // 执行它们都构造函数时， 执行了 normalizeBase() 初始化 base 路径
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }
  init (app: any /* Vue component instance */) {...}
}
```
### 第二步 Vue.use(router)
Vue.use() 会触发 Vue的插件机制,执行install方法
这一步主要是 注册了全局的 `router-view ` 和 `router-link` 组件， 混入了 `beforeCreate()` 方法，以及 在原型上挂载`$router和 $route` 
这时候，还不会执行mixin进去的beforeCreate() 因为当前没有Vue的实例并没有挂载
```js
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    // 全局混入 beforeCreate(), 所有的组件都会执行
    // new  Vue() 则会产生根组件，那么就会执行下面这个函数
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
  // 在原型上挂载 $router 与 $route 
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  // 全局注册router-view 与 router-link组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

### 第三步 new Vue(options)

根组件上就会用 $options保留options选项
因此，根组件上的$options会有 router 这个实例
这时候，就可以看到进入 beforeCreate()

### 第四步 执行Vue.mixin的beforeCreate
```js
Vue.mixin({
  beforeCreate: function beforeCreate () {
    // 只有根实例才会执行
    if (isDef(this.$options.router)) {
      this._routerRoot = this;
      this._router = this.$options.router;
      // 这里就执行了 路由实例的 init方法了
      this._router.init(this);
      // 将 根实例的 _route 定义为响应式的数据
      // 也就是 _route只要发生变化，那么就会重新渲染
      // 在 下面介绍的init函数中，将改变作为一个函数进行listen
      //  下面这段这段注释的代码在 router的init方法中 
      //  history.listen(route => {
      //   this.apps.forEach(app => {
      //     app._route = route
      //   })
      // })
      Vue.util.defineReactive(this, '_route', this._router.history.current);
    } else {
      this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
    }
    registerInstance(this, this);
  },
  destroyed: function destroyed () {
    registerInstance(this);
  }
});
```
### 第五步进入 VueRouter的init方法
```js
// 从上一步this._router.init(this)， 也可知 app就是vue的组件
init (app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' &&
      assert(
        install.installed,
        `not installed. Make sure to call \`Vue.use(VueRouter)\` ` +
          `before creating root instance.`
      )

    this.apps.push(app)

    // set up app destroyed handler
    // https://github.com/vuejs/vue-router/issues/2639
    app.$once('hook:destroyed', () => {
      // clean out app from this.apps array once destroyed
      const index = this.apps.indexOf(app)
      if (index > -1) this.apps.splice(index, 1)
      // ensure we still have a main app or null if no apps
      // we do not release the router so it can be reused
      if (this.app === app) this.app = this.apps[0] || null

      if (!this.app) this.history.teardown()
    })

    // main app previously initialized
    // return as we don't need to set up new history listener
    // 如果根组件init过了，就不再执行了（其实也只有根组件才会执行init）
    // init过之后，只要路径发生变化，就只走对应的渲染逻辑，更新视图
    if (this.app) {
      return
    }
    // 根实例
    this.app = app
    // history 通过 new HashHistory()生成
    const history = this.history

    if (history instanceof HTML5History || history instanceof HashHistory) {
      const handleInitialScroll = routeOrError => {
        const from = history.current
        const expectScroll = this.options.scrollBehavior
        const supportsScroll = supportsPushState && expectScroll

        if (supportsScroll && 'fullPath' in routeOrError) {
          handleScroll(this, routeOrError, from, false)
        }
      }
      const setupListeners = routeOrError => {
        // 执行这个就 绑定了hashchange 事件
        history.setupListeners()
        handleInitialScroll(routeOrError)
      }
      // 关键在这里， transitionTo() 是vue-router切换路由的关键方法
      // 每次 的  push， replace都是走这个方法
      // 而 go(number) ,是 window.history.go(n); 需要history访问堆栈支持
      history.transitionTo(
        history.getCurrentLocation(),
        setupListeners,
        setupListeners
      )
    }

    history.listen(route => {
      this.apps.forEach(app => {
        // 只要这里一改变 _route的值，视图就会重新渲染，
        // 否则如果当前路径没有改变，不会进入这里
        app._route = route
      })
    })
    
    // 下面注释的代码来自编译后的 vue-router.js
    // listen 的 参数存在  cb数组中
    // History.prototype.listen = function listen (cb) {
    //  this.cb = cb;
    // };
    // 什么时候调用?
    // updateRoute的时候调用， 一旦route发生变化，视图就会更新
    //   History.prototype.updateRoute = function   updateRoute (route) {
    //   this.current = route;
    //   this.cb && this.cb(route);
    // };
  }
```
进入 History这个类，进行具体分析
来自源码， src/history/base.js
```js
// 只拿了部分代码
  transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    let route
    // catch redirect option https://github.com/vuejs/vue-router/issues/3201
    try {
      // 在第一步的时候 this.matcher = createMatcher(options.routes || [], this)
      // route 就是当前路径匹配的路由，
      // 就是平常在组件中常用的this.$route
      route = this.router.match(location, this.current)
    } catch (e) {
      this.errorCbs.forEach(cb => {
        cb(e)
      })
      // Exception should still be thrown
      throw e
    }
    const prev = this.current
    this.confirmTransition(
      route,
      () => { // 这个函数作为 onComplete传入 confirmTransition 内执行
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
          hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          // Initial redirection should not mark the history as ready yet
          // because it's triggered by the redirection instead
          // https://github.com/vuejs/vue-router/issues/3225
          // https://github.com/vuejs/vue-router/issues/3331
          if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
            this.ready = true
            this.readyErrorCbs.forEach(cb => {
              cb(err)
            })
          }
        }
      }
    )
  }
  // route 匹配到的route , onComplete 跳转完成回调， onAbort 终止跳转回调
  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    this.pending = route
    const abort = err => {
      // changed after adding errors with
      // https://github.com/vuejs/vue-router/pull/3047 before that change,
      // redirect and aborted navigation would produce an err == null
      if (!isNavigationFailure(err) && isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => {
            cb(err)
          })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            warn(false, 'uncaught error during route navigation:')
          }
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    const lastRouteIndex = route.matched.length - 1
    const lastCurrentIndex = current.matched.length - 1
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      lastRouteIndex === lastCurrentIndex &&
      route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
    ) {
      this.ensureURL()
      if (route.hash) {
        handleScroll(this.router, current, route, false)
      }
      return abort(createNavigationDuplicatedError(current, route))
    }
    const { updated, deactivated, activated } = resolveQueue(
      this.current.matched,
      route.matched
    )
    // 这里需要将所有组件路由守卫函数找到，按顺序执行
    // 先 deactivated 的
    // 再处理 updated的
    // 然后 activated 的 （也就是当前需要展示的）
    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      // 这个函数在 源码中 util/resolve-components.js
      // 返回一个函数 (to, from, next) => {...}
      resolveAsyncComponents(activated)
    )
    const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }

    // 执行路由守卫函数，属于一个递归的过程
    // 为什么递归？我觉得可能是嵌套路由的问题，目前看不太懂
    runQueue(queue, iterator, () => {
      // wait until async components are resolved before
      // extracting in-component enter guards
      // 下方有这个函数的源码， 这个用于执行 beforeRouteEnter
      const enterGuards = extractEnterGuards(activated)
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort(createNavigationCancelledError(current, route))
        }
        this.pending = null
        // onComplete 回调执行，调用 updateRoute,更新路由
        onComplete(route)
        if (this.router.app) {
          this.router.app.$nextTick(() => {
            // 路由挂载后的处理
            handleRouteEntered(route)
          })
        }
      })
    })
  }


function extractEnterGuards (
  activated: Array<RouteRecord>
): Array<?Function> {
  // 执行
  return extractGuards(
    activated,
    'beforeRouteEnter',
    (guard, _, match, key) => {
      return bindEnterGuard(guard, match, key)
    }
  )
}
```


> 为啥new Vue() 的时候需要挂载 router 实例
```js
import Vue from "vue"
import router from "./router"

new Vue({
  el: "#app",
  router,
  components: {App},
  render: h => h(App)
})
```

为了在原型上挂载路由实例  Vue.prototype.$router = router ,这样全局都可以使用 this.$router了

> router-view 与 router-link 组件是怎么来的？

在 vue-router中声明并全局注册，可以通过 Vue.extend() 或者

```js
  const vm = new Vue({
    // h 是 createElement, 返回 VNode， 可以通过 $mount(domId) 进行指定挂载,
    // $mount() 如果不传入宿主对象， 则会创建真实的dom，但是不会追加操作
    render: h => h(Component, {props})
  }).$mount()
```

> 如何解决 router-view的嵌套？

从源码中寻找答案
1、 routerView 代表当前组件是否是router-view
2、 routerViewDepth 属性，标记路由的深度
3、 matched 深度匹配的数组，同一深度的都会放matched[depth]中
```js
import { warn } from '../util/warn'
import { extend } from '../util/misc'
import { handleRouteEntered } from '../util/route'

export default {
  name: 'RouterView',
  functional: true, // 函数式组件，需要在render中接受各种基本属性
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render (_, { props, children, parent, data }) {
    // 是否是 router-view 组件标志
    data.routerView = true

    const h = parent.$createElement
    const name = props.name
    const route = parent.$route
    const cache = parent._routerViewCache || (parent._routerViewCache = {})

    // 路由深度 
    let depth = 0
    let inactive = false

    // 递归向上查找router-view
    while (parent && parent._routerRoot !== parent) {
      const vnodeData = parent.$vnode ? parent.$vnode.data : {}
      if (vnodeData.routerView) {
        depth++
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }
    data.routerViewDepth = depth

    if (inactive) {
      const cachedData = cache[name]
      const cachedComponent = cachedData && cachedData.component
      if (cachedComponent) {
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps)
        }
        return h(cachedComponent, data, children)
      } else {
        return h()
      }
    }

    // 路由深度，数据在route中维护
    const matched = route.matched[depth]
    const component = matched && matched.components[name]

    if (!matched || !component) {
      cache[name] = null
      return h()
    }

    cache[name] = { component }

    data.registerRouteInstance = (vm, val) => {
      const current = matched.instances[name]
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val
      }
    }

    ;(data.hook || (data.hook = {})).prepatch = (_, vnode) => {
      matched.instances[name] = vnode.componentInstance
    }

    data.hook.init = (vnode) => {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance
      }
      handleRouteEntered(route)
    }

    const configProps = matched.props && matched.props[name]
    if (configProps) {
      extend(cache[name], {
        route,
        configProps
      })
      fillPropsinData(component, data, route, configProps)
    }

    return h(component, data, children)
  }
}

function fillPropsinData (component, data, route, configProps) {
  // resolve props
  let propsToPass = data.props = resolveProps(route, configProps)
  if (propsToPass) {
    // clone to prevent mutation
    propsToPass = data.props = extend({}, propsToPass)
    // pass non-declared props as attrs
    const attrs = data.attrs = data.attrs || {}
    for (const key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key]
        delete propsToPass[key]
      }
    }
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          `props in "${route.path}" is a ${typeof config}, ` +
          `expecting an object, function or boolean.`
        )
      }
  }
}
```

