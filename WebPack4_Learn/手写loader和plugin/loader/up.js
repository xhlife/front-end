const loaderUtils = require("loader-utils");

module.exports = function (content, sourcemap, mate) {
  console.log("loader1 main");
  return content + "console.log(789);";
};

// 前置钩子
module.exports.pitch = function (r, p, data) {
  console.log("loader1 pitch");
  data.value = "loader1 的 pitch";
};
