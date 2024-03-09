当计算属性采用 undefined 的属性时，后续的修改也不会导致 computed 的变化

```js
export default {
  data() {
    return {
      // test: 1
    }
  },
  computed: {
    computeTest () {
      return this.test
    }
  },
  mounted() {
    console.log(this.computeTest) // undefined
    setTimeout(() => {
      this.test = 'hhh';
      setTimeout(() => {
        console.log(this.computeTest) // undefined
      },1000)
    },3000)
  }
}
```
