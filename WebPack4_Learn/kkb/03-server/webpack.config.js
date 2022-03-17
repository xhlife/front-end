const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              //css modules 开启
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash:6].[ext]",
            outputPath: "images/",
            //推荐使用url-loader 因为url-loader支持limit
            //推荐小体积的图片资源转成base64
            limit: 12 * 1024, //单位是字节 1024=1kb
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: "cheap-inline-source-map",
  // devServer: {
  //   //可以是相对路径
  //   contentBase: "./dist",
  //   open: true,
  //   hot: true,
  //   //即便HMR没有生效，浏览器也不要自动刷新。
  //   hotOnly: true,
  //   //代理
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:9092",
  //     },
  //   },
  //   //mock server
  //   before(app, server) {
  //     app.get("/api/mock.json", (req, res) => {
  //       res.json({
  //         hello: "express",
  //       });
  //     });
  //   },
  //   port: 8080,
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      //选择html模板
      title: "首页",
      template: "./src/index.html",
      filename: "index.html",
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
