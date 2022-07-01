如果是动态改变 popper 中的列表数据，导致高度发生变化而带来偏移，可以在请求数据之前，把数据列表置空

```js
this.listData = []
this.getList()
```

如果没办法解决，那么就采用二次渲染的方式， 直接让 popper 更新位置

```html
<!-- 延迟一点打开 -->
<el-popper ref="popper" delay-open="300" :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"></el-popper>

<script>
  methods: {
    getList() {
      // 获取数据之后

      this.$nextTick(() => {
        this.$refs.popover.updatePopper()
      })
    }
  }
</script>
```
