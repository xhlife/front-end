## 普通对象object
> {[key]:[value]} 任何一个对象都是由零到多组键值对组成（属性名不能重复）
```javascript
var person = {
  name: 'xxx',
  age: '20',
  sex: 'male',
  height: 'xxx',
  1:100
  ...
}
```
### 读取value 的方式
> `.` 方式 （不能读取数字属性的值）
```javascript
person.name // 'xx x'
person.1 // 报错 SyntaxError: 语法错误
```
> [key] 方式
```javascript
person['name'] // 'xxx'
```
### 设置属性（略）
### 删除属性
> 真删除
`delete object[key]` 

> 假删除
设置为 `null/undefined` 


