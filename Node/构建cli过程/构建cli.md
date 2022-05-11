“CLI 是 Command Line Interface 的缩写,即命令行界面。

比如 npm, 本身也是通过 bin 属性安装为一个可执行命令的

构建一个 node 的 cli, 关键在于 package.json 的 bin 属性

> 首先初始化一个 package.json 文件

```js
npm init -y
```

> 修改 package.json 基本文件信息

```js
{
  "name": "my-cli",
  "version": "0.0.1",
  "description": "Auto generate project template",
  "main": "index.js",
  // 可执行文件 配置后才可以在控制台使用你的命令
  // 构建 cli 必须写的字段
  "bin": {
    "my-cli": "./index.js"
  },
  // 发布代码包的地址
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [
    "cli"
  ],
  // 作者
  "author": "",
  "license": "MIT",
  "bugs": {
    // bug论坛地址
    "url": ""
  },
  // 脚手架主页说明地址
  "homepage": ""
}
```

> 新建 bin 关联的可执行文件

index.js 文件

```js
#!/usr/bin/env node  // 这一句必须写，告诉系统执行脚本时，调用node 环境
console.log("hello cli")
```

> 安装到全局

```js
sudo npm i -g

// 或者 链接一下
// npm link
```

执行成功之后，就可以在终端执行 bin 下定义的命令

```js
my - cli
// 输出
// hello cli
```

#### 举个简单的列子

ls 命令

```js
const fs = require("fs")
const pwdPath = process.cwd() // 当前cli命令所在的目录
const files = fs.readdirSync(pwdPath)
let output = files
  .map(item => {
    let stat = fs.statSync(pwdPath, +"/" + item)
    let type = stat.isDirectory() ? "目录" : "文件"
    return `[${type}]    ${item}\r\n`
  })
  .join("")
console.log(output)
```

####

> 使用的一些基础包

- fs 文件读写， node 内置不用安装
- path 文件路径处理， node 内置
- commander 定义命令， 解析命令
- inquirer 交互式命令窗口
- chalk 命令行输出五颜六色的字体
- ora 效果图标

#### 生成 package.json 文件例子

```js
import fs from "fs"
import path from "path"
import {Command} from "commander"
const cm = new Command()
import iq from "inquirer"
import figlet from "figlet"
import chalk from "chalk"
import clear from "clear"
import ora from "ora"
const PWD_PATH = process.cwd()
cm.version("1.0.0", "-v, --version")

// 定义初始化命令
cm.command("init <name>").action(name => {
  clear()
  console.log(chalk.green(figlet.textSync("welcome to jinrirencai")))
  iq.prompt([
    {
      type: "input",
      name: "name",
      message: "project name"
    },
    {
      type: "checkbox",
      name: "pre-css",
      choices: ["scss", "less", "stylus"]
    }
  ]).then(answers => {
    console.log(answers)
    let json = {
      name: answers.name
    }
    writeJson(json)
  })
})
cm.command("test").action(name => {
  console.log("name")
})

// 使用 commander 包，参数的解析必须放到最后
cm.parse(process.argv)

function writeJson(jsonData) {
  let text = JSON.stringify(jsonData, 2, "\t")
  let file = path.join(PWD_PATH, "test.json")
  fs.writeFile(file, text, err => {
    if (err) {
      console.log(err)
    } else {
      console.log("文件创建成功 \n")
    }
  })
  const process = ora("下载...")

  process.start()

  setTimeout(() => {
    process.succeed("下载完成")
  }, 3000)
}

export default {}
```

#### @vue/cli 的工程化开始 vue create

#### node cli 的其他玩法

vue create 只是 vue-cli 的一部分
在 vue 的快速原型开发上，我们我可以 vue serve app.vue 快速开发， 其实本质是开启了 webpack 的服务

从 npm run dev 说一下@vue/cli-service

npm run dev 会执行 package.json 中对应的命令

```json
{
  "script": {
    "dev": "vue-cli-service serve"
  }
}
```

#### npm run 的执行流程

指定 script 之前，会把 node_modules/.bin 添加到环境变量$path 前。

举例来说，使用@vue/cli 创建一个 vue 项目后，运行 npm run dev,

npm 会在 cmd 命令行中运行 vue-cli-service serve。

其中 vue-cli-service 命令是 npm 在执行脚本前，会把 node_modules/.bin 加到环境变量$path 的前面(打开 node_modules/.bin 目录，你能找着@vue/cli-service 文件中的 package.json 中 bin 属性正好是 vue-cli-service)，执行结束后，再将 path 复原。

这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，而不需要在 package.json 文件的 scripts 的属性值中加上可执行文件的完整路径。

#### 从代码简单说一下 cli-service 启动 webpack 服务
