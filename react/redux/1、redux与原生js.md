Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 (如果你需要一个 WordPress 框架，请查看 Redux Framework。)

可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。

Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="counter">
    <div id="counter-value"></div>
    <button id="increment-btn">+</button>
    <button id="decrement-btn">-</button>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/redux/3.0.6/redux.js"></script>
  <script>
    const createStore = Redux.createStore;
    let initState = 0;
    const INCREMENT = Symbol.for('INCREMENT');
    const DECREMENT = Symbol.for('DECREMENT');
    /**
     * 在redux中动作是由规定的，规定必须有一个值不为undefined 的 type属性
     * @param {*} state
     * @param   action
     * */ 
    function reducer(state=initState,action){
      switch (action.type) {
        case INCREMENT:
          return state+1;
        case DECREMENT: {
          return state -1;
        }
        default:
          return state;
      }
    }
    let store = createStore(reducer);
    let state = store.getState();
    console.log(state);
    let counterValue = document.querySelector('#counter-value');
    let incrementBtn = document.querySelector('#increment-btn');
    let decrementBtn = document.querySelector('#decrement-btn');

    function render() {
      counterValue.innerHTML = store.getState();
    }
    render();
    store.subscribe(render); // 订阅更新
    incrementBtn.addEventListener('click', function(){
      store.dispatch({type: INCREMENT});
    })
    decrementBtn.addEventListener('click', function(){
      store.dispatch({type: DECREMENT})
    })
  </script>
</body>
</html>
```