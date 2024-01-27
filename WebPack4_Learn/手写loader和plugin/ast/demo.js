const acorn = require("acorn");
const walk = require("acorn-walk"); // 便利的对 acorn 生成的 ast 进行 遍历
const MagicString = require("magic-string"); // 它允许以字符串作为对象来操作, 特别适用于处理字符串模板和代码生成

// 虚构 js代码字符串
const source = "const a = 20; const b = 60;";

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
