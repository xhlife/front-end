源码中找答案：src\core\instance\state.js - initData()

```js
function initData (vm: Component) {
  let data = vm.$options.data
  // 如果data是函数， 则执行，并返回其结果
  // 假如用的是对象，则可能出现下面这种情况
  /**
   * let dataTest = {}
   * Vue.component('Test1', {data: dataTest})
   * Vue.component('Test2', {data: dataTEst})
   * 上面的两个组件用的是同一份data,数据就共享了
   * 为什么根组件上不需要？
   * 因为每次实例化的时候， 都是 new Vue()执行，确保了是唯一的
  */
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  .....
  .....
}

export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
```

可见，函数每次执行都会返回全新 data 对象实例
