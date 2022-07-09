源码中找答案：src\core\vdom\patch.js - updateChildren

key 的主要作用就是为了高效的更新虚拟 dom,

其原理是 vue 在 patch 过程中通过 key 可以精确判断两个节点是否是同一个，

从而避免频繁更新不同元素，使得整个 patch 过程更加高效， 减少 dom 操作量， 提高性能

若不设置 key 还可能在列表更新时引发一些隐蔽的 bug

vue 中使用相同标签名元素的过度切换时，也会使用到 key 属性，

其目的也是为了让 vue 可以区分他们， 否则 vue 只会替换其内部属性而不会出发过度效果
