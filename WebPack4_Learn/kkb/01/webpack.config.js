const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack 是基于nodeJS的
// webpack配置 就是一个对象
const path = require("path");
module.exports = {
  //上下文 项目打包的相对路径 必须是绝对路径
  //context: process.cwd(),
  //入口 执行构建的入口 项目入口 字符串 数组 对象
  entry: "./src/index.js",
  //   entry: ["./src/index.js", "./src/other.js"],
  //   entry: {
  //     index: "./src/index.js",
  //     other: "./src/other.js",
  //   },
  //出口
  output: {
    //构建的文件资源放在哪？必须是绝对路径
    path: path.resolve(__dirname, "./build"),
    //构建的文件资源叫啥？ 无论是多出口还是单出口 都推荐使用占位符
    filename: "[name]-[hash:6].js",

    //占位符
    //hash 整个项目的hash值，每构建一次 就会有一个新的hash值
    //chunkhash 根据不同入口entry进行依赖解析，构建对应的chunk,生成相应的hash,
    // 只要组成entry的模块没有内容改动，则对应的hash不变
    //name
    //id
  },
  //构建模式  none  production development
  mode: "development",

  //插件 这个机制原理是作用于webpack整个打包周期的
  plugins: [new CleanWebpackPlugin()],
  //处理 不认识的 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        //loader的执行顺序是从后往前
        //css-loader 言简意赅 是把css模块的内容 加入到 js模块中去
        //css in js方式

        //style-loader 从js中提取css的loader 在html中创建style标签 把 css的内容放在这个style标签中
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
