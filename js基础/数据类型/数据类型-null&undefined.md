## null / undefined
> null 和 undefined 都是代表没有

- `null`: 意料之中（一般null都是我们自己赋值的）
```javascript
var a = null;
var b; // 不赋值会默认为undefined
```
- `undefined`: 意料之外（可能一不小心就为undefined了）
```javascript
var a0; // 后面没有赋值，默认undefined
var a = 12;
var b = {}
a = b.a // 变为undefined了
```