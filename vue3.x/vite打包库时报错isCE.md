
一、修改打包属性，将vue剥离

```js
rollupOptions: {
  external: ["vue"],
  output: {
    globals: {
      vue: "Vue"
    }
  }
}
```

将Vue从package.json中的dependencies中移除掉