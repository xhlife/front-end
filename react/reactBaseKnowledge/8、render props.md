render props 指一种在 react 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render-prop 的组件接受一个函数， 该函数返回一个 react 元素并调用它，
而不是实现自己的渲染逻辑

render prop 是一个用于告知组件需要渲染什么内容的函数 prop

```jsx
// MouseTracker.js  // 跟踪鼠标的位置
export default class MouseTracker extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    };
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <p>请移动鼠标位置</p>
        <p>
          x: {this.state.x} y:{this.state.y}
        </p>
      </div>
    );
  }
}
```

但是可能不想渲染一个 div 想渲染一张图片， 这时候就要用到 render prop

```jsx
export default class MouseTracker extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    };
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    return <div onMouseMove={this.handleMouseMove}>
      {this.props.children(this.state);}
    </div>
  }
}
```

使用

```jsx
import MouseTracker from './Mouse....';
import Picture from './Pic...';

export default class xx extends Component {
  render() {
    return <MouseTracker>{(props) => <Picture {...props} />}</MouseTracker>;
  }
}
```



这种写法并没有体现 render prop 是一个函数

因此，换一种写法

```jsx
export default class MouseTracker extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    };
  }
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  };
  render() {
    return <div onMouseMove={this.handleMouseMove}>
    /* 这里调用render 函数 */
      {this.props.render(this.state);}
    </div>
  }
}
```

使用

```jsx
import MouseTracker from './Mouse....';
import Picture from './Pic...';

export default class xx extends Component {
  render() {
    // 这里传递进去 render 函数
    return <MouseTracker render = {(props) => <Picture {...props} />} />;
  }
}
```

本质上和高阶组件没有什么区别