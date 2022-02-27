### react 绑定函数 this 指向问题解决方法

> 使用 bind
> 使用箭头函数
> 使用类属性

```jsx
class Button extends React.Component {
  constructor(){
    super();
    this.state = {data:1}
  }
  add() {
    this.setData({data:this.state.data+1})
  }
  // add = () => { // 使用类属性
  //   this.setData({data:this.state.data+1})
  // }
  // 类原型上面的方法
  render(){
    // 使用bind
    // return <button onClick={this.add.bind(this)}>+</button>
    // 使用箭头函数
    return <button onClick={（）=> this.add() }>+</button>

    // 使用类属性
    // return <button onClick={this.add}>+</button>
  }
}
```

### setState 可能是异步更新数据，同步代码的多次更新会合并,更新只会添加/覆盖属性，不会删除

两次相加会合并，最后只会让 state.data + 1

```jsx
add() {
  this.setState({
    data: this.state.data + 1,
    test: '1'
  })
  console.log(this.state.data) 

  // 不会删除test属性
  this.setState({
    data: this.state.data + 1
  })
  console.log(this.state.data)
}
```

```jsx
this.setState(newState);
this.setState(newState);
// 1、将 newState 存入pending中
// 2、 判断是否处于 batch update(批量更新)
// 是 -》 保存组件于 dirtyComponetns 中
// 否 -》 遍历所有的dirtyComponents ,调用 updateComponent 更新pending state or props
```

##### 采用回调的方式解决这个问题

```jsx
add() {
  this.setState((oldState) => ({
    data: oldState.data + 1
  }), () => {
    console.log(this.state.data) // 输出2
  });
  this.setState((oldState) => ({
    data: oldState.data + 1
  }), () => {
    console.log(this.state.data) // 输出 2
  })
}
```


##### 为什么两次都是输出2？
因为调用setState的时候， 传入的回调会放入到一个数组中

下面为模拟代码
```js
let state = {data: 0, test: '1'}
let callbacks = [];
this.setState(() =>(), () => ());
this.setState(() =>(), () => ());
this.setState(() =>(), () => ());
// 调用三次setState, 收集三次回调
callbacks=[[()=>(),() =>()],()=>(),() =>()],()=>(),() =>()]]
```
只有当第一个回调的数组执行完才会执行第二个

```js
let v;
let secondCallbacks = [];
while( !(v = callbacks.shift())) {
  let [fir,sec] = v;
  Object.assign(state, fir(state))
  secondCallbacks.push(sec);
}
secondCallbacks.forEach(fn => fn())
```
