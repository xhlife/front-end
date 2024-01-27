const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const code = `const view = {
  a: 3,
  init: () => {
    view.a = 5
  },
  render() {

  }
}`;

const ast = esprima.parse(code);

estraverse.traverse(ast, {
  enter: function (node) {
    if (node.type === "VariableDeclaration") {
      node.kind = "var";
    }
  },
});
const reg_code = escodegen.generate(ast);
console.log(reg_code);
