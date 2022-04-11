官方文档并没有提供这个属性的使用方式， 但是 matcher 上提供了 match、addRoute、 addRoutes 方法

当想替换整个 router 对象的 routes 时，没有对应的 api

可以采用下面的方法

```js
router.matcher = new VueRouter({
  routes: newRoutes
}).matcher
```

具体原因：在做路径切换 transitionTo 方法中，首先就会使用 const route = this.router.match(location, this.current)来匹配 route, 其实内部会使用 matcher 来做匹配。修改了 matcher 即新的 routes 生效。
对 router.matcher 属性做修改，即新的 routes 就会替换老的 routes, 其实就是 replaceRoutes()的含义
