vue2 采用hook监听生命周期

```html 
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

vue3 采用 hook监听生命周期

```html 
<template>
  <child-component @vnode-updated="onUpdated">
</template>

<!-- 或者采用驼峰命名 -->

<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```