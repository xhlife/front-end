看下面代码

```js
new Promise((r) => {
  r();
})
.then(() => console.log(1))
.then(() => console.log(2))
.then(() => console.log(3))

new Promise((r) => {
  r();
})
.then(() => console.log(4))
.then(() => console.log(5))
.then(() => console.log(6))
//  1 4 2 5 3 6
```

* Promise 多个 then() 链式调用，并不是连续的创建了多个微任务并推入微任务队列，因为 then() 的返回值必然是一个 Promise，而后续的 then() 是上一步 then() 返回的 Promise 的回调
* 传入 Promise 构造器的执行器函数内部的同步代码执行到 resolve()，将 Promise 的状态改变为 <resolved>: undefined, 然后 then 中传入的回调函数 console.log('1') 作为一个微任务被推入微任务队列
* 第二个 then() 中传入的回调函数 console.log('2') 此时还没有被推入微任务队列，只有上一个 then() 中的 console.log('1') 执行完毕后，console.log('2') 才会被推入微任务队列
