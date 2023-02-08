在 vue-router中的导航守卫的回调中，一般带三个参数

to: 即将要进入的目标
from: 当前导航正要离开的路由

next: 这个参数在 v3版本和v4版本有些不同

v3版本： 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

* next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

* next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

* next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

* next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调


v4版本中，它是一个可选参数，而回调函数的放回结果类同next效果(当然next参数传递是优先的)

v4版本中，回调可以返回下面的值

* false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

* 一个路由地址: 通过一个路由地址跳转到一个不同的地址，就像你调用 router.push() 一样，你可以设置诸如 replace: true 或 name: 'home' 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 from 一样。

```ts
router.beforeEach(async (to, from) => {
   if (
     // 检查用户是否已登录
     !isAuthenticated &&
     // ❗️ 避免无限重定向
     to.name !== 'Login'
   ) {
     // 将用户重定向到登录页面 效果等同 next({name: "Login"})
     return { name: 'Login' }
   }
 })
```

但是无论 v3版本还是v4版本，如果有next()，它们都要遵循下面的的规则

确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错

```ts
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

同时，需要注意next() 不带参数的描述(进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的))

也就是 next() 不带参数的调用，等于终止导航

因此，我们在写next() 的时候需要注意避免死循环

```ts
// 下面的写法会死循环
router.beforeEach((to, from, next) => {
  next('/home')
})

// 正确写法：判断一下路由
router.beforeEach((to, from, next) => {
  if(to.fullPath==='/home'){
    next();
  } else {
    next('/home')
  }
})
```



