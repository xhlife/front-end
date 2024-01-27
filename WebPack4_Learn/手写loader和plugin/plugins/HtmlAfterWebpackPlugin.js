const HtmlWebpackPlugin = require("html-webpack-plugin");

const pluginName = "HtmlAfterWebpackPlugin";

const assetHelp = (data) => {
  let js = [];
  let css = [];
  const dir = {
    js: (item) => `<script class"lazyload-js" src="${item}"></script>`,
    css: (item) => `<link ref="stylesheet" href="${item}"></link>`,
  };

  for (let jsitem of data.js) {
    js.push(dir.js(jsitem));
  }
  for (let cssitem of data.css) {
    css.push(dir.css(cssitem));
  }
  return {
    js,
    css,
  };
};

class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "MyPlugin", // <-- Set a meaningful name here for stacktraces
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
