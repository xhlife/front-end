## Function 函数
> 函数是一段javascript代码，只定义一次，但可能被执行或者调用任意次。 <br>
> 在javascript里，函数即对象，程序可以随意控制它，比如函数赋值给变量，或函数作为参数传递等。

### 定义
+ 方式一： 函数声明语句
```javascript
function Foo(){}
```
+ 方式二：函数表达式
```javascript
var Foo = function(){}
```
#### 函数可以嵌套
```javascript
function Foo(a,b){
    function sq(c){
        return c *c
    }
    return sq(a) + sq(b)
}
```

### 调用
函数在定义时时不会执行的，有四种方式来调用javascript函数
* 作为函数 
`Foo()`
* 作为方法 (即对象的方法)
```javascript
var a = {
    o: function(){}
}
a.o();
a["0"]()
```
* 作为构造函数
```javascript
var a = new Foo(); // 等价 var a = new Foo 不带参数的构造都可省略()
```
* 通过他们的call()和apply() 方法间接调用
```javascript
var a = []
Object.prototype.toString.call(a) // "[object Array]"
```
### 函数参数（形参、实参概念略）
> 实际上，js函数调用甚至不会检测传入参数的个数和类型，因此都是显式控制参数。
```javascript
function foo(o){
    if(o === undefined){
        return
    }
    ...
    return true;
}
```
___ 注意：引用对象传参，内部改变形参，实参也会变；原始值传参，形参实参不影响 ___

#### arguments 标识符
> 在函数体内，arguments标识符是指向实参对象的引用，实参对象是一个类数组对象 
```javascript
function max(){ // 参数都会写入argumnets中
    if(arguments.length == 0){
        return false
    }
    var max = arguments[0];
    for(var i =1;i<arguments.length; i++){
        if(arguments[i] > max){
            max = arguments[i];
        }
    }
    return max
}
max(5,4,9,8,3)  // 9
```
### 自定义属性
> js中函数并不是原始值，而是一种特殊对象，因此可以拥有属性
```javascript
function count(){
    return count.num++;
}
count.num = 0; // 实际上是将值绑定到count.prototype上
count() // 0
count() // 1
count() // 2
```
这种特性可以用作函数缓存
```javascript
// 计算阶乘
function fa(n){
    if(isFinite(n) && n >0 && n == Math.round(n)){ // 限制输入为有限整数
        if(!(n in fa)){
            fa[n] = n * fa(n-1) // 计算结果缓存,递归寻找前一个
        }
        return fa[n]
    }else{
        return NaN; // 输入有误
    }
}
fa[1] = 1; // 初始化缓存
fa(2) // 2
fa(5) // 120
```
### 作为命名空间的函数





