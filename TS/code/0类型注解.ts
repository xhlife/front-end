let s: Number = 1 
s = 123
// s = {} 报错 。因为 {} 是 Object类型
// 任意类型
let s1: any = 1 
s1 = {}
s1 = []
// 函数
function add(x: number, y: number): number {
  return x + y;
}


let myAdd = function (x: number, y: number): number {
  return x + y;
};

let myAdd2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

// 数组
let arr: Array<any> = []
let arr0: number[] = [1, 2, 3,/* 'str' */];
let arr2: Array<number> = [1, 2, 3]

let readonlyArr: ReadonlyArray<string> = ['a', 'b', 'c']

// 元组，跟数组基本一致，可以定义多种类型
let tArr: [string, number] = ['2', 1] // 顺序必须一致

// 枚举
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// 还有一些特殊的查看中文文档 https://www.tslang.cn/docs/handbook/basic-types.html
