

为了使diva 放置目标，必须取消div'sdragenter和dragoverevents。您可以Event.preventDefault()使用.prevent 事件修饰符调用这些事件：

```html

<div @drop="dropLink" @dragenter.prevent @dragover.prevent></div>
```

如果您需要根据拖动数据类型接受/拒绝放置，请设置一个有条件地调用的处理程序Event.preventDefault()

```js
<div @drop="dropLink" @dragenter="checkDrop" @dragover="checkDrop"></div>
export default {
  methods: {
    checkDrop(e) {
      if (/* allowed data type */) {
        e.preventDefault()
      }
    },
  }
}
```