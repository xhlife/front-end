如果赋予 React 组件相同的 props 和state， render() 函数会渲染相同的内容，在某些情况下使用 React.PureComponent可提高性能。


React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则可能无法检查到深层的差别，产生错误的对比结果。所以只在props 和 state 比较简单时使用这个，或者在深层数据结构发生变化时调用forceUpdate()来确保组件被正确地更新。也可以使用immutable 对象加速嵌套数据的比较。

此外，React中 的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，确保所有子组件也是“纯的”组件。

注意： 非常不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringfy()。非常影响效率、损耗性能。
```jsx
export default class PurComponent extends React.component {
  isPureComponent = true;
  shouldComponentUpdate(nextPros, nextState) {
    return !shallowEqual(this.props, nextProps) || 
        !shallowEqual(this.state, nnextState);
  }
}
// 浅比较
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== 'objec' || obj1 === null ||
      typeof obj2 !== 'objec' || obj2 === null
   ) {
     return false;
   }

   let keys1 = Object.keys(obj1);
   let keys2 = Object.keys(obj2);
   if(keys1.length !== keys2.length) {
     return false;
   }
   for(ley key of keys1) {
     if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
       return false;
     }
     return true;
   }
}
```

#### pureComponent 对函数组件没有用
怎么解决 ？

使用 memo

```jsx
function Title(props) {
  return <h1>{props.title}</h1>
}
Title = React.memo(Title)
```

memo原理
```jsx
function memo(FuncComponent) {
  return class extends PureComponent {
    render() {
      return <FuncComponent {...this.props} />
    }
  }
}
```