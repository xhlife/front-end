const path = require("path");
const ConsoleLogOnBuildWebpackPlugin = require("./plugins/index");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlAfterWebpackPlugin = require("./plugins/HtmlAfterWebpackPlugin");
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
  // plugins: [new ConsoleLogOnBuildWebpackPlugin()],
  plugins: [new HtmlWebpackPlugin(), new HtmlAfterWebpackPlugin()],
};
