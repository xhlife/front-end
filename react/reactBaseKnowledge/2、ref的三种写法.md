### 一、ref 用于获取 dom 真实节点

#### 写法 1 字符串写法

```jsx
getInp(){
  let inp = this.refs.inp; // input 的 dom元素
}
render(<><input ref="inp"/><button onClick={() => this.getInp()}></button></>);
```

#### 写法 2 函数式写法

```jsx

getInp(){
  let inp = this.inp; // input 的 dom元素
}
render(<><input ref={inst => this.inp = inst}/><button onClick={() => this.getInp()}></button></>);
```

#### 写法 3 React.createRef() (1,2将废弃)

```jsx
constructor(){
  super();
  this.inp = React.createRef();
  // 也可使用下面的 createRef 函数
  // this.inp = createRef(); 
}
getInp(){
  let inp = this.inp.current; //current值才是 input 的 dom元素
}
render(<><input ref={this.inp}/><button onClick={() => this.getInp()}></button></>);
```

#### 为什么这么写？
因为性能好

```js
function createRef(){
  return {
    current: null
  }
}
```

初始化的时候 this.inp 是一个{current: null};

因此 ref = {this.inp} 将挂在虚拟dom上

当珍视dom 挂在的时候，发现this.inp是一个Ref对象， 
那么将真实的dom元素赋值给 this.inp.current 属性


### 二、 ref获取组件
写法和上面一致的，但是不能直接引用函数组件，不能直接引用函数组件，

#### 如何在函数组件使用ref
使用forwardRef()  即转发ref

```jsx
// 函数组件
function TextInput(props, ref) {
  return <input ref={ref} />
}
let TextInputRef = React.forwardRef(TextInput);

//  TextInputRef 就是函数组件的 ref引用
```

### 非受控组件和受控组件

非受控组件： dom元素的值，由真实dom保存，不受react控制

受控组件： dom 元素的值受react的状态控制
