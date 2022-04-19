无论是全局 mixin 还是组件内部的 mixin, 都遵循下面的原则（默认的覆盖原则）

- 当组件选项与混入选项冲突时以组件优先

- 当组件和 mixin 同时定义生命周期选项,两个都会触发,而且 mixin 会先触发

- 如果组件和 mixin 同时定义相同方法,会使用组件方法,会覆盖 mixin

- 如果组件和 mixin 同时定义相同计算属性,会使用组件方法,会覆盖 mixin

```js
// 定义一个混入对象
const myMixin = {
  data() {
    return {
      name: "mixin"
    }
  },
  mounted() {
    this.name // component (打印的是组件的name 的值)
  }
}
// 定义一个Vue
const app = new Vue({
  el: "#app",
  //mixins节点表示引入混入,接收一个数组,可以是多个mixin
  mixins: [myMixin],
  data() {
    return {
      name: "component"
    }
  },
  mounted() {
    this.name // component
  }
})
```
