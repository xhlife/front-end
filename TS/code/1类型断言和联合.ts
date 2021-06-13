function getL(str: number |string /* 类型联合 */): number {
  if ((<string>str).length) {
    return (<string>str).length;
  } else {
    return str.toString().length;
  }
}

let b = 100;  // 编译器推断为number
// b = '123' // 报错
