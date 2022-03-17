### 源码优化
#### 1、代码模块优化
> 常用组件封装
> 重用css, 通过less或sass的自定义css 变量来减少重复代码

#### 2、template优化
> for循环使用key值
> 合理使用v-show 与 v-if
> 不要在模板中使用过多的逻辑表达式与判断，尽量使用computed

#### 3、路由懒加载
```js
{
  path: '/test',
  component: () => import('./test.vue');
}
```

#### 4、理解生命周期， 不要造成内存泄漏，绑定的事件以及全局组件在组件销毁后需要销毁

#### 5、使用keep-alive缓存组件

### 打包优化

#### 1、修改vue.config.js
把productionSourceMap设置为false，不然最终打包过后会生成一些map文件，`如果不关掉，生成环境是可以通过map去查看源码的`。

并且可以开启gzip压缩，使打包过后体积变小。

#### 2、使用cdn的方式外部记载一些资源

比如vue-router、axios等Vue的周边插件，
在webpack.config.js里面，externals里面设置一些不必要打包的外部引用模块。
然后在入门文件index.html里面通过cdn的方式去引入需要的插件。

```javascript
// Webpack.config.js
module.exports = {
  externals: {
    vue: 'vue',
    'vue-router': 'VueRouter',
    axios: 'axios'
  }
}
```

```html
<head>
  <script src="https://cdn.bootcss.com/axios/..."></script>
  <script src="https://cdn.bootcss.com/vue-router/..."></script>
  <script src="https://cdn.bootcss.com/vue/..."></script>
</head>
```

#### 3、减少图片使用, 图片使用懒加载

因为对于网页来说，图片会占用很大一部分体积，
所以，优化图片的操作可以有效的来加快加载速度。
可以用一些css3的效果来代替图片效果，或者使用雪碧图来减少图片的体积。

#### 4、按需引入

咱们使用的一些第三方库可以通过按需引入的方式加载。
避免引入不需要使用的部分，无端增加项目体积。
比如在使用element-ui库的时候，可以只引入需要用到的组件。

```javascript
import { Input, Select } from 'element-ui';
```

#### 5、首屏为登录页，可以做成多入口打包，登录页单独分离为一个入口

#### 6、预加载
预加载技术（prefetch）是在用户需要前我们就将所需的资源加载完毕，

`不是所有浏览器都支持，主要是Chrome浏览器。`

DNS prefetch 分析这个页面需要的资源所在的域名，浏览器空闲时提前将这些域名转化为 IP 地址，真正请求资源时就避免了上述这个过程的时间。[----HTML5 prefetch](https://www.jianshu.com/p/7f58ddfc1392)

由于域名转换成为IP的过程是非常耗时的一个过程，DNS prefetch可以减少这部分的时间。

```html
<meta http-equiv='x-dns-prefetch-control' content='on'>
<link rel='dns-prefetch' href='http://g-ecx.images-amazon.com'>
<link rel='dns-prefetch' href='http://z-ecx.images-amazon.com'>
<link rel='dns-prefetch' href='http://ecx.images-amazon.com'>
<link rel='dns-prefetch' href='http://completion.amazon.com'>
<link rel='dns-prefetch' href='http://fls-na.amazon.com'>
```

预加载也可以对某个静态资源起到专门的作用。

```html
<link rel='subresource' href='libs.js'>
```

预渲染（pre-rendering）是这个页面会提前加载好用户即将访问的下一个页面。

```html
<link rel='prerender' href='http://www.pagetoprerender.com'>
```

