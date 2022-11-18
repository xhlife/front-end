###  `script setup` 语法 不能使用getCurrentInstance的ctx

这里的ctx不是setup提供的ctx

```js
const { ctx } = getCurrentInstance()
```

这里ctx打包后在生产环境下是获取不到的.

正确使用

```js
const { proxy } = getCurrentInstance()
```
