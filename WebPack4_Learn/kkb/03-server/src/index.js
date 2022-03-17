//引入polyfill
// import React, { Component } from "react";
// import ReactDom from "react-dom";

// class App extends Component {
//   render() {
//     return <div>hello world</div>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("app"));

// import "@babel/polyfill";
// const arr = [new Promise(() => {}), new Promise(() => {})];

// arr.map((item) => {
//   console.log(item);
// });

//给垫片瘦身，实现按需加载 减少冗余

// promise 浏览器不认识怎么办？

//polyfill 垫片 ES6+的ECMA规范库
//引进来

import css from "./css/index.less";

console.log("test111!!!!!!");

//修改了入口文件的js内容
//有没有修改css?

// import counter from "./counter";
// import number from "./number";

// counter();
// number();

// if (module.hot) {
//   module.hot.accept("./number.js", function () {
//     document.body.removeChild(document.getElementById("number"));
//     number();
//   });
// }
// 请问大家，业务开发中，有几位同学不借助前端框架些项目?
// 使用vue？
// 使用react?
// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// import axios from "axios";
// import pic from "./images/logo.png";
// console.log("css");
// axios.get("/api/info").then((res) => {
//   console.log(res);
// });
// let ele = `<div class=${css.ele}>css module</div>`;

// var img = new Image();
//图片的路径 pic
// img.src = pic;
// var root = document.getElementById("root");
// root.append(img);

// document.write(ele);
// console.log(css, css.toString());
