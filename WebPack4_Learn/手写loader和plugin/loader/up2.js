module.exports = function (content, sourcemap, mate) {
  console.log("loader2 main");
  return content + "console.log(566);";
};

// 前置钩子
module.exports.pitch = function (r, p, data) {
  console.log("loader pitch");
  data.value = "loader2 的 pitch";
};
