## String类型
> 所有用单引号、双引号、反引号（ES6的``）包起来的都是字符串

### 把其他类型转化为字符串
- [val].toSting()
```javascript
let a = 12;
a.toString() // '12'
// 普通对象（指{}包裹的）,调用的是Object.prototype.toString()
// Objec.prototype.toString() 是用来检测数据类型的
// 而数组[] 等,在开辟空间后会重写自身的toString() 方法
[12,13].toString() // '12,13'
let b = {a: 12}
b.toSting() // [onject,object]
let a = function(){console.log('hh')}
 a.toString() // 'function(){console.log(\'hh\')}'

// null 和undefinef 是禁止使用toSting()的，使用会直接报错
```

- 字符串拼接
  > 规则： `+运算`在有字符串时为字符串拼接，没有时为加法,同时其他类型转化为数字
```javascript
12 + '12' // '1212'
12 + true // 13 原因： Number(true) => 1
12 + false // 12  Number(false) => 1
12 + undefined // NaN Number(undefined) => NaN
12 + null // 12  Number(null) => 0
12 + [] // '12' 原因： []先toString()，这时不是加法，而是拼接
// 只有+ 会把数字转化为字符串， 意为拼接
// 其他 - * / 等运算都会字符串转数字
12 -"3" // 9
12 - "3px" // NaN
```
