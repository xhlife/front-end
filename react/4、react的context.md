解决props深层次传递值问题

### 旧版实现

```jsx
// 提供数据
export default class Page extends React.Componetn {
  static childContextTypes = {
    color: 'string',
    setColor: 'function'
  }
  // 返回 或说定义真正的子上下文
  getChildContext() {
    return {
      color: this.state.color,
      setColor: this.setColor
    }
}

// 获取数据

export default class Child extends React.componet {
  // 指定获取那些数据， 只能少不能多（因为上级不提供要也没用）
  // 写了这个静态属性，那么组件回默认多一个context属性
  static contextTypes = {
    color: 'string'
  }

  render() {
    return <><p>{this.context.color}</p></>
  }
}
```


### 新版实现

```jsx
// 提供数据
const ThemeContext = React.createContext();
// 包含 Provider 和 Cunsumer
export default class Page extends React.Component {
  constructor {
    super();
    this.state = {
      color: 'red',
    }
  }
  setColor = (color) => {
    this.setState({color})
  }
  render () {
    const ctx = {color: this.state.color, setColor: this.setColor}
    return (<ThemeContext.Provider value={ctx}>
      // 包裹的子组件
    </ThemeContext.Provider>)
  }
}
```

```jsx
// 获取属性 - 类组件写法
class child extends React.Component {
  // 这种写法只适用于 类组件
  static contextType  = ThemeContext;
  render() {
    return (<p>{this.context.color}<p>)
  }
}
```
```jsx
// 获取属性-函数组件写法
// 使用消费者
function Child(props){
  return (<ThemeContext.Consumer>
    {
      value => (<p>{value.color}</p>)
    }
  </ThemeContext.Consumer>)
}
```

### React.creatContex() 模拟实现

```jsx
function createContext(){
  class Provider extends React.Component {
    static value;
    $$typeof = REACT_PROVIDER_TYPE; // 用于判断是否是react的provider
    constructor(props) {
      super(props);
      Provider.value = props.value;
      this.state  = {value: props.value};
    }
    static getDerivedStateFromProps(props, state) {
      Provider.value = props.value;
      return {value: props.props}
    }
    render() {
      return this.props.children
    }
  }
  class Consumer extends React.Component {
    render() {
      return this.props.children(Provider.value)
    }
  }
  return {
    $$typeof: REACT_CONTEXT_TYPE, Provider, consumer
  }
}
```