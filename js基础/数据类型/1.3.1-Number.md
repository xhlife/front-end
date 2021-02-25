## Number类型
> 包含：常规数字、NaN

### NaN
> not a number: 不是一个数字，但属于数字类型
NaN和任何的值（包括自己都不相等）
`NaN != NaN // true`

   #### isNaN
   > 检测一个值是否为非有效数字, 如果是NaN(不是数字)，返回true
   ```javascript
   isNaN(10) // false
   isNaN('10') // false, 调用isNaN之前会先执行Number('10'), 转化为数字
   
   //( 具体的js 类型转换，参考数据转换笔记)
   // 布尔值会被Number() 转为true / false
   isNaN(true) // false
   isNaN(false) // false
   isNaN('')   // false
   isNaN(null) // false

   isNaN(undefined) // true
   
   isNaN('AA') // true
   ```

   #### Number() / parseInt() / parseFloat()
   > `Number()`
   引用类型会先调用toString(),再Number
   而原始类型会有自己的处理方式
   ```javascript
   // string只要包括非数字，就会被转为NaN。不会依次排查是否为有效数字，而parseInt/parseFloat会
   // 空的string 会被转为boolean值false,然后转为0
   Number('12.5') // 12.5
   Number('123px') // NaN
   Number('12.5.5') // NaN
   // boolean true->1 , false -> 0
   Number(true) // 1
   Number(false) // 0
   // Null Null为空对象指针
   Number(null) // null -> false -> 0

   // undefined undefined 代表没有值
   Number(undefined) // NaN 

   // object
   Number({}) // NaN

   //Array
   // [] => 
   Number([]) // [] => false =>0
   // [12] => "12"
   Number([12]) // 12
   // [12,13] => "12,13"
   Number([12,13]) // NaN
   // 因此， 引用类型转化为数字， 先执行toString() 方法，再Number()
   ```
   > `parseInt([val, 进制)` / `parseFloat`
   会把所有的非`String|number`类型先转换为`String`再处理
   从左至右排查有效数字字符，直到遇到非有效数字，再进行转换
   第二个参数为转化基数（即当前数字代表的进制）
   `parseFloat()`  不支持第二个参数
   ```javascript
      // String
      parseInt('12.5px') // 12
      parseInt('12.2.2.2') // 12
      
      parseFloat('12.5px') // 12.5
      parseFloat('12.2.2.2') // 12.2

      parseInt('11',2) // 3
      // 2指示'11'代表二进制数字， 转换后为3
      
      // 非数字和非字符串会先转化为字符串
      parseInt(true) // NaN 
      parseInt(null) // NaN
      parseInt([])  // NaN
      parseInt('') // NaN
   ```

