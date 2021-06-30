### 声明变量
+ var es6之前的方式
+ let es6新增
+ const es6新增

### 变量的作用域 & 变量提升
es6之前没有块级作用域，只有函数作用域与全局作用域，
同时只有var的方式声明变量，而 var 声明的变量会变量提升的效果

变量提升: 允许变量先使用，后定义

#### es5之前的变量作用域 & 变量提升
```javascript
// 变量提升
console.log(a) // global
console.log(b) // i am global too
// bar() // 报错  bar is not a function
console.log(bar) // bar

// 作用域
var a = 'global'
var bar = 'bar'
function bar(){  // 函数提升优先其他类型, var bar = 'bar'将覆盖 function bar(){}
  var a = 'local'
}
function foo(){
  console.log(b) // b为全局变量
}
if(a){  // 无块级作用域, b  为全局变量
  var b = 'i am global too'
}
```

#### let&const产生块级作用域&无变量提升
```javascript
// 无变量提升
// console.log(a) // 报错 a is not defined
// console.log(b)  // 报错
// bar()        // 因为声明重名，这里不会执行
let a = 'global'
let bar = 'bar'
function bar(){  // 报错 ，因为 let 声明后，不允许重名
  let a = 'local'
  console.log(a)
}

if(a){
  let b = 'i am local, now'
  console.log(b) // i am local, now
}
// console.log(b)  报错
``` 


#### let 
let 用于声明变量，有以下几个注意点
+ 不允许重复声明
+ 不存在变量提升
+ 引入块级作用域

### const
const 用于声明变量，有以下几个注意点
+ 不允许重复声明
+ 声明后必须初始化
+ 不存在变量提升
+ 存储的内存地址不允许改动

```javascript
// const PI; // 报错 声明则必须初始化
const PI = 3.14;  
// const PI = 3.1415;  // 报错 不允许重复声明

const foo  = {}  // 引用类型数据，
foo.test = 'test'
// foo = {}  // 报错 ， 因为 重新 foo = {} 修改了存储的内存地址
```
因此，采用const 声明变量时需要特别注意
