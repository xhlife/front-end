### Set 
ES6新的数据结构，类似(去重后的)数组，因为Set的成员值是唯一的

```js
const set = new Set()
// 重复成员会被剔除
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i); 
}
// 2 3 5 4
```

增删查改，支持链式调用
1. add(val) 添加
2. delete(val) 删除
3. has(val)
4. clear() 清空

遍历操作
1. keys()
2. values()
3. entries() 
4. forEach()

属性
1. size  成员总数


#### 一些简单应用

> 去重
```js
let a = [...new Set([1,2,1,2])]  // [1,2]

let b = Array.from(new Set([1,2,1,2])) // [1,2]
```
> 数组的交集、并集、差集
```js
let a = new Set([1,2,3])
let b = new Set([2,3,4])

// 并集 
let union = new Set([...a,...b])

// 交集
let intersect = new Set([...a].filter(i => b.has(i => b.has(x))))

// 差集 （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
```
  
