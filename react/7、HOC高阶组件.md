- 高阶组件就是一个函数，传给它一个函数，它返回一个新的组件
- 高阶组件的作用其实就是为了 组件之间的代码复用

```jsx
// logger.js 输出组件的渲染时间
export default class Logger extends Component {
  componentWillMount() {
    this.start = Date.now();
  }
  componentDidMount() {
    console.log(Date.now() - this.start + 'ms');
  }
  render() {
    return <div>logger</div>;
  }
}
```

采用高阶组件复用上面的逻辑

```jsx
// withLogger.js
export default function (Comp) {
  return class extends React.Component {
    componentWillMount() {
      this.start = Date.now();
    }
    componentDidMount() {
      console.log(Date.now() - this.start + 'ms');
    }
    render() {
      return <Comp {...this.props} />;
    }
  };
}
```

使用

```jsx
import withLogger from './withLogger';

class Counter extends React.Component {
  render() {
    return (<div>counter</div>)
  }
}

export default withLogger(Counter);
```

多层嵌套很恶心， 也是hook解决的难题之一


