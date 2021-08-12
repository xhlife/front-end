var a = 123 // 给数值变量分配栈内存
var etf = 'ARK' // 给字符串分配栈内存
// 给对象及其包含的值分配堆内存
var obj = {
  name: 'tom',
  age: 13,
}
// 给数组及其包含的值分配内存（就像对象一样）
var a = [1, null, 'PSAC']
// 给函数（可调用的对象）分配内存
function sum(a, b) {
  return a + b
}
