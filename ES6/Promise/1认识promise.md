### 什么是 promise

Promise 是 js 中进行异步编程的解决方案
Promise 是ES新增的对象，对象
比如，回调地狱

```javascript
function fn(res1,function(res2,function(res3){
...
}){}){}
```

### 为什么使用promise

+ 指定回调函数的方式更加灵活
+ 支持链式调用，可以解决回调地狱问题


回调地狱终极解决方案 async / await


#### 同步和异步(经典面试题)
```javascript
let p = new Promise(resolve =>{
  console.log(1);
  setTimeout(() => {
   resolve(2)
  }, 1000);
})
console.log(3);
setTimeout(() => {
  console.log(4);
}, 1000);
setTimeout(() => {
  console.log(5);
}, 0);
p.then( val => {
  console.log(val);
})
setTimeout(() => {
  console.log(6);
}, 3000);
// 1 3 5 2 4 6

// new Promise()  是同步的,(即执行器函数是同步的)
// p.then() 也是同步的，但是 val => {} then的回调是异步的，而且没有resolve()/reject()的话，回调是不会执行的

//then()的作用就是，指定回调，并返回一个 Promise()

// 这也是为什么支持链式调用
let p3 = new Promise( resovle => {
  resolve(2)
})
p3.then( res => {
  return res + 1  // 这里return 的数据将别包装成一个Promise, 不return，函数默认return undefined
}).then( res => {
  return res  + 1
}).then( res => {
  console.log(res);  // 输出 4
})
```
`new Promise() 与`
### promise 状态
一共三个状态 pendding,fulfilled(resolved),rejected
+ pendding ----> resolved
+ pendding ----> rejected
  即等待---->成功  或 等待-----> 失败
**** 一旦状态改变，就不会再变化,也就是说只有上面两种状态改变

基本流程： new Promise() -> 成功/失败resolved/reject -> 回调执行(onResolve/onReject)，即(.then())或者catch()捕捉错误 -> 返回新的Promise()

注意： 只有没被处理的err再回被catch()捕捉到，同时catch()只可指定一个回调

### 如何使用Promise
promise既是构造函数（语法上），也是函数对象，用于封装异步处理(功能上)
```javascript
let promise = new Promise()
Promise.all();
Promise.resolve() 
// ....

//  基本使用
let p = new Promise((resolve,reject) => {
  // 这里就是回调函数体
  
  // 成功
  resolve()

  // 失败
  // reject()
})
p.then( data => {
  // 接收成功的结果
},reason => {
  // 接收失败的结果
})
```
#### APT
[es-入门](https://es6.ruanyifeng.com/#docs/promise)


### Promise 关键问题
+ 如何修改promise状态
  (1) resolve(val) 成功

  (2) reject(reason) 失败

  (3) throw new Error() 失败 Error对象 抛出啥就是啥
       
      throw 3;   // 3  

+ 改变状态和指定回调函数，谁先执行？
(1)、都有可能，正常情况下是先指定回调，后改变状态，但也可先改变状态再执行指定回调函数
```javascript
let p = new Promise( resolve => {
  setTimeout(() => {
    resolve(1)  // 延后一秒 resolve()
  }, 1000);
}).then( res => {}, err => {}) // 立刻指定回调，但是不会立刻执行，等到resolve()后执行

let p1 = new Promise( resolve = > {
  resolve(1)  // 立刻改变状态
}).then( res => {})   // 立刻执行指定回调函数
```

+ 如何先改状态再指定回调（先resolve()/reject()再then()）
  (1)、 直接resolve()/reject()

  (2)、延长时间调用then()
```javascript
// 直接resolve
let p = new Promise(resolve => {
  resolve()  // 先改变了状态
}).then( res =>{},err => {}) // 后指定回调

// 延迟执行 then()
let p1 = new Promise( resolve => {
  setTimeout(() => {
      resolve
  }, 1000);
})
setTimeout(() => {
  p1.then( res => {})
}, 2000);
```
+ 什么时候得到数据？
  (1)先指定回调，状态改变后，指定回调就会执行，拿到结果
  
  (2)先改变状态，当指定回调时，回调就会执行，拿到结果

+ promise.then() 返回的新的promise的状态由什么决定?
  (1)由then() 指定的回调函数的返回值决定
```javascript
let p = new Promise( resolve => {
  resolve(1)
}).then( res => {
  console.log(res); // 1
  return res + 1
}).then( res => {
  console.log(res); // 2
  return Promise.resolve(3)
}).then( res => {
  console.log(res); // 3
  return Promise.reject(4)
}).then( res =>{
  console.log(res,'succ'); // 这里不会执行，
},err => {
  console.log(err,'err');// 输出 4 err
  throw 5
}).then( res => {
  console.log(res);  // 这里不执行
},err => {
  console.log(err,'err'); // 输出 4 err
  // 不返回， 默认返回 undefined
}).then( res => {
  console.log(res,'succ'); // undefined "succ"
  throw 6
}).catch( err => {
  console.log(err,'before last'); // 6 "before last"
}).then( res => {
  console.log(res, 'last');  // undefined last
})
// 因此， 回调中 返回reject(),或者throw,那么下一个then() 就会走 err => {}
```
+ 如何中断 Promise的链式调用?
  (1)返回一个pending的Promise
```javascript
.then( res => {
  // 不resolve 也不reject()，那么就是pending
  return new Promise (() => {})
})
```
  


