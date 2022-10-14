
## 字位操作
如， ~ 字位操作（非）， ｜ 字位操作（或） & 字位操作（与）

字位操作符只适用于 32 位整数，运算符会强制操作数，使用32 位格式， 这是通过抽象操作 ToInt32 来实现的。

ToInt32 首先执行ToNumber 强制类型换，然后执行 ToInt32

```js
0 | -0 // 0
0 | NaN // 0

3.6 & 7.9 // 3  只会取整数部分操作 0011 & 0111 有一出一 得 0011 
~~45.7 // 45
```

~x 的 效果大致等同于 -(x+1)

```js
~42 // -(42+1) => -43
```

采用这个特性，可以对indexOf的结果做一些操作
```js
var a = "hello world"
if(a.indexOf("lo") > -1) {
  // 找到匹配
}
if(a.indexOf("lo") != -1) {
  // 这种情况也是找到匹配
}
// 相较于 > -1 !=-1 这种判断操作，我们可以采用下面这种写法

// 而 indexOf 找到返回index, 没找到返回  -1
// ~-1  => 0  0=> false ,其他数字 => true
if(~a.indexOf("lo")){ 

} 
```

同样，也可以利用ToInt32特性，进行字位的截取
```js
// ToInt32  不同于 Math.floor
// 或许对于正树，它们的结果是一致的，但是对于 负数，就不是了，看下面的例子
Math.floor(-49.6) // 50
~~49.6 // 49
```
同样采用其他的字位符也可以达到这样的目的
```js
-4.1 | 0 // -4  注意，这里只能于 0 或操作，因为 有一出一，那么还是原来的 32 位 Int
// 同理
78.9 & 78 // 78
```

## void 关键字
 void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。
```js
undefined === void 0 // true
// 如果一个变量为undefined 才赋值
var a;
if(a === undefined) a = {}
// 下面的写法可以省敲几下键盘
if(a === void 0) a = {}
```

## 数组判断
constructor比采用函数更快
```js
// 在 v8中
const a = []
a.constructor === Array // 最快
a instanceOf Array  // 次
Array.isArray(a) // 慢
```

## 正则表达式的test和exce多次执行带来的bug

```js
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'; 
let data = { name: '姓名', age: 18 }
const reg = /\{\{(\w+)}\}/g
console.log(reg.test(template)) // true
console.log(reg.exec(template)) // 按理应该是检测到 {{name}}的，但是输出的 age

const a = ['{{name}}', '{{age}}', '{{sex}}']

for(let i = 0; i< a.length; i++) {
  console.log(reg.exec(a[i]))
}
// 输出的结果如下, 第二个检测不到了
/**
 * 
[ '{{name}}', 'name', index: 0, input: '{{name}}', groups: undefined ]
null
[ '{{sex}}', 'sex', index: 0, input: '{{sex}}', groups: undefined ]
*/
```

相关解析： 
在全局模式下，当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把正则表达式对象的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。

```js
for(let i = 0; i< a.length; i++) {
  console.log(reg.exec(a[i]))
  reg.exec(a[i] // 再执行一次， 就会将lastIndex 置为 0, 这样三次都能匹配到
  // 或者 reg.lastIndex = 0; 
}
```