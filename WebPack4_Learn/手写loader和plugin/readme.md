### loader 原理

实际就是文件内容读取、转换、输出, 以 js 文件为例就是，string -> ast -> string

当然其他的文件也是类似的的一个过程

而至于怎么转化， 主要看 loader 的实现内容

以 markdown-loader 的代码为例子

loader.js 的内容

```js
import { parse } from "marked";

export function markdownLoader(markdown) {
  const options = this.getOptions();

  return parse(markdown, options);
}
```

main.cjs 文件内容

```js
const loaderImport = import("./loader.js");

async function trampolin(...args) {
  const { markdownLoader } = await loaderImport;

  return markdownLoader.call(this, ...args);
}

module.exports = trampolin;
```

当 webpack.config.js 文件中配置 rules，指定要的 loader 时， 其实就是拿到 loader 的入口，

也就是上面的 main.cjs 文件的内容。

webpack-config.js 的 rules 内容

```js
...
rules: [
  {
    test: /\.js$/,
    use: {
      loader: path.resolve(__dirname, "loader/up.js"),
      options: {
        jjj: 123,
      },
    },
  },
];
...
```

只要是， module.exports 导出的函数， webpack 都会认为是 loader 的入口

有三个参数 content, sourcemap, mate

其中 content 就是读取的文件内容

如何获取 rules 中配置的 options 的内容呢？

webpack4.x 中通过 loader-utils 这个工具库

```js
npm i loader-utils --save-dev
```

然后

```js
const loaderUtils = require("loader-utils");

module.exports = function () {
  const opt = loaderUtils.getOptions(this);
};
```

webpack5.x 中，已经将 getOptions 这个函数挂到 loader 这个类上了, 或者通过 query 也可以获取得到

```js
module.exports = function () {
  const opt = this.getOptions();
  const opt2 = this.query;
};
```

#### 简单的 loader 实现

test.js

```js
module.exports = function (content, sourcemap, mate) {
  return content + "console.log(566)";
};
```

#### 前置钩子 pitch

pitch 函数的主要应用是利用 module 的 request 来提前做一些拦截处理的工作。

```js
use: [
  {
    loader: "a",
    options: {
      /* ... */
    },
    pitch: function (request) {
      // 在这里，你可以对请求做一些预处理，例如修改request.query或request.options
      return (
        "/* 前置钩子代码 */" +
        require.resolve("a-loader") +
        "/* 后置钩子代码 */"
      );
    },
  },
];
```

当处理一个文件，需要用到多个 loader 时， loader 的处理时从右到左的，那么 pitch 会怎执行呢？

答案是， 所有的 pitch 都会先执行

up.js

```js
module.exports = function (content, sourcemap, mate) {
  console.log("loader1 main");
  return content + "console.log(789);";
};

// 前置钩子
module.exports.pitch = function (r, p, data) {
  console.log("loader1 pitch");
  data.value = "loader1 的 pitch";
};
```

up2.js

```js
module.exports = function (content, sourcemap, mate) {
  console.log("loader2 main");
  return content + "console.log(566);";
};

// 前置钩子
module.exports.pitch = function (r, p, data) {
  console.log("loader pitch");
  data.value = "loader2 的 pitch";
};
```

配置 webpack-config.js 文件执行打包后将得到下面的结果

```js
loader1 pitch
loader pitch
loader2 main
loader1 main
```

#### 一些 ast 操作的包

```js
const acorn = require("acorn");
const walk = require("acorn-walk"); // 便利的对 acorn 生成的 ast 进行 遍历
const MagicString = require("magic-string"); // 它允许以字符串作为对象来操作, 特别适用于处理字符串模板和代码生成

// 虚构 js代码字符串
const source = "const a = 20";

// 得到 ats 语法树
const result = acorn.parse(source);

// 得到 可操作字符串的对象
const code = new MagicString(source);

walk.simple(result, {
  // 获取所有的字面量节点
  Literal(node) {
    console.log(`found a literal: ${node.value}`);
  },
  // 获取所有变量声明的节点
  VariableDeclaration(node) {
    const { start } = node;
    // 重写代码
    code.overwrite(start, start + 5, "var");
  },
});

console.log("result", code.toString());
```

### plugin

上面介绍了 loader 是对文件 读取->转换->输出。

Loader 主要用于文件的转换和处理。而 Plugin 则是用于扩展 Webpack 的功能。

webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。

下面是来自官网的代码

新建 plugins/index.js 文件

```js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack 构建正在启动！");
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

然后，在 webpack.config.js 中使用这个 plugin

```js
const path = require("path");
const ConsoleLogOnBuildWebpackPlugin = require("./plugins/index");
module.exports = {
  entry: "./src/index.js", // 指定入口文件
  output: {
    filename: "main.js", // 输出文件名
    path: path.resolve(__dirname, "dist"), // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loader/up.js"),
            options: {
              jjj: "loader1",
            },
          },
          {
            loader: path.resolve(__dirname, "loader/up2.js"),
            options: {
              jjj: "loader2",
            },
          },
        ],
      },
    ],
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};
```

同时这里保留了之前的 loader, 执行 npm run dev

```js
The webpack build process is starting!!!
loader1 pitch
loader pitch
loader2 main
loader1 main
```

可见在这个例子中， plugin 比 loader 先执行， 为什么比 loader 先执行？ 其实是由 webpack 内部的 hooks 执行顺序有关， 如果想要 plugin 在 webpack 打包完之后执行，也是可以的

plugin 是 webpack 通过 compiler 调度的， 就是上面的 plugin 中 apply 函数的参数

下面是来自 webpack.js 文件源码的一部小分

```js
let compiler

...

compiler = new Compiler(options.context)

for (const plugin of options.plugins) {
  if(typeof plugin === 'function') {
    plugin.call(compiler, compiler)
  } else {
    // 调度所有插件， 传入 compiler
    plugin.apply(compiler)
  }
}
```

`Compiler -> apply -> compiler.hooks.run <- new AsyncSeriesHooks(["compiler"]) -> tap`

AsyncSeriesHooks 是 tapable 这个包中的一个函数

tapable 是一个发布订阅模式的包， 然后可以通过一堆的 hooks 去发布

那 tap 中的 compilation 是什么呢？

```js
compiler.hooks.run.tap(pluginName, (compilation) => {
  console.log("webpack 构建正在启动！");
});
```

compilation 对象里的内容很复杂，可以称为 编译实例。 它的构造函数也是扩展于 tapable

在[文档](https://www.webpackjs.com/api/compilation-object/#root)中有这个对象的部分介绍

由于 plugin 本质是通过 hooks 的方式，进行调度的

那么 如果某个插件，也提供一个 hooks，就可以在一个某个插件处理后，再进行处理

下面是在 html-webpack-plugin 插件处理后，再通过自定义插件的处理

html-webpack-plugin 的版本是^5.6.0, 不同版本可能会对提供的 hooks 或者 hooks 的用法进行调整，具体看 官方文档

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pluginName = "HtmlAfterWebpackPlugin";
class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName, // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.html += "The Magic Footer";
          console.log(data.assets);
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}
module.exports = HtmlAfterWebpackPlugin;
```

webpack.config.js 配置文件的 plugin 进行下面的修改

```js
 plugins: [new HtmlWebpackPlugin(), new HtmlAfterWebpackPlugin()],
```

采用这个进行打包后， 可以看到 在 html 文件尾部添加了 字符串 “The Magic Footer”
