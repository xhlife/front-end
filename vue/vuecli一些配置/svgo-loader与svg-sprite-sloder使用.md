首先，安装插件

```js
npm i svgo-loader svg-sprite-loader -D
```

配置 vue.config.js

```js
config.module.rule("svg").exclude.add(resolve("src/icons")).end()
config.module
  .rule("svg-sprite")
  .test(/\.svg$/)
  .include.add(resolve("src/icons"))
  .end()
  .use("svg-sprite-loader")
  .loader("svg-sprite-loader")
  .options({
    symbolId: "icon-[name]"
  })
  .end()
  .before("svg-sprite-loader")
  .use("svgo-loader")
  .loader("svgo-loader")
  .options({
    plugins: [
      {
        name: "removeAttrs",
        params: {
          attrs: "(fill|stroke)"
        }
      }
    ]
  })
  .end()
```

全局 svg-icon 组件配置
首先，根据上面的配置， 在 src 下新建 icons 目录
然后在 icons 下新建 index.js 文件

```js
//  index.js
import Vue from "vue"
import SvgIcon from "@/components/SvgIcon" // svg component

// register globally
Vue.component("SvgIcon", SvgIcon)

const req = require.context("./svg", false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

然后在 main.js 文件中引入即可

```js
import "@/icons" // icon
```
