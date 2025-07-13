
### 问题

React Hooks 闭包陷阱（也称为"过时闭包"问题）是指在使用 Hooks 时，由于 JavaScript 闭包特性导致函数组件中的回调函数或 effect 捕获了旧的 state 或 props 值，而不是最新的值。

### 问题表现

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // 这里总是打印初始值0
    }, 1000);
    return () => clearInterval(timer);
  }, []); // 依赖数组为空

  return <button onClick={() => setCount(count + 1)}>增加</button>;
}
```
在这个例子中，定时器回调函数捕获了初始渲染时的 count 值（0），即使后续 count 更新了，回调函数中访问的仍然是旧的 count 值。


### 原因分析

这是由于 JavaScript 闭包的工作方式决定的：

- 组件每次渲染都会创建一个新的函数作用域

- 内部函数（如 useEffect 的回调）会捕获创建时的外部变量（闭包）

- 如果依赖数组没有正确设置，React 不会重新创建这些内部函数


### 解决方案

#### 1、添加依赖项

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);
  return () => clearInterval(timer);
}, [count]); // 添加count依赖
```

#### 2. 使用函数式更新（对于setState）

```js
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => prevCount + 1); // 使用函数式更新, 注意这里也不会改变count的值，只是函数式更新会导致页面展示内容更新
  }, 1000);
  return () => clearInterval(timer);
}, []); // 现在可以安全地省略依赖
```

#### 3. 使用useRef保存可变值

```js
const [count, setCount] = useState(0);
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count; // 每次count更新时同步到ref
});

useEffect(() => {
  const timer = setInterval(() => {
    console.log(countRef.current); // 通过ref访问最新值
  }, 1000);
  return () => clearInterval(timer);
}, []);
```