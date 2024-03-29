### vue的key的作用 
key 是diff算法的依据

底层会根据key去判断dom是否可以复用

如果 前一次 key 和 后一次的 key 相同， 那么渲染的时候会复用这个 dom

### 为什么最好不要采用index 作为 key?

1. 带删除操作时， index自动递减， 但是 只是相当于数组的长度减去 1， 而 index 还是从 0, 1, 2, 3 ... length

2. tab切换，刷新列表的情况， 因为 列表是渲染是同一个， 不同的tab页，如果共用 一个变量 list -> [], 那么采用index作为key，也有可能会复用dom。


### key 用在组件上时，组件会重新加载
当key 用在某个组件上时，切换导致组件复用，生命周期都会重新执行一遍

```html
<div>
  <div>
    <div uuid="1">menu1</div>
    <div uuid="2">menu2</div>
  </div>
  <Child :key="uuid" /> <!-- 子组件 --> <!-- uuid是会变化的 -->

  <!-- 如果在Child里面有watch父组件的data，可能需要immediate，因为每次都是重新执行Watch -->
</div>
```