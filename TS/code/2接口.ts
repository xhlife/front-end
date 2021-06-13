// 对象接口
interface Person {
  name: string,
  age: number, /*  必须传递 */
  sign?: string /* 可以不用传递 */
  readonly sex: string  /* 只读属性 */
  [propName: string]: any; // 无论传递什么都接收
}

function p(p:Person){
  this.p = p
}

let a: Person = {
  name: 'test',
  sex: 'm',
  age: 18,
  color: 'yellow'
}

function P(p: Person) {
  this.p = p
}
let newP = new P(a)

// 函数接口
interface SearchFunc {
  /* (source: string, subString: string)需要接收的参数   : boolean 返回值类型 */
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

 // 类接口
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
// 需要通过 implements 关键字
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}