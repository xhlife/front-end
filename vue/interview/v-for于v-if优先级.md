源码中找答案 compiler/codegen/index.js

```js
export function genElement(el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0"
  } else if (el.tag === "slot") {
    return genSlot(el, state)
  } else {
    // component or element
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : "" // data
      }${
        children ? `,${children}` : "" // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```

实践出真知

```html
<div id="demo">
  <h1>v-for和v-if谁的优先级高？应该如何正确使用避免性能问题？</h1>
  <!-- <p v-for="child in children" v-if="isFolder">{{child.title}}</p> -->
  <template v-if="isFolder">
    <p v-for="child in children">{{child.title}}</p>
  </template>
</div>
<script src="../../dist/vue.js"></script>
<script>
  // 创建实例
  const app = new Vue({
    el: "#demo",
    data() {
      return {children: [{title: "foo"}, {title: "bar"}]}
    },
    computed: {
      isFolder() {
        return this.children && this.children.length > 0
      }
    }
  })
  console.log(app.$options.render)
</script>
```

两者同级时时（上面注释 p 标签部分）， 渲染函数如下：

```js
;(function anonymous() {
  with (this) {
    return _c(
      "div",
      {attrs: {id: "demo"}},
      [
        _c("h1", [_v("v-for和v-if谁的优先 级高？应该如何正确使用避免性能问题？")]),
        _v(" "),
        _l(children, function (child) {
          return isFolder ? _c("p", [_v(_s(child.title))]) : _e()
        })
      ],
      2
    )
  }
})
```

〉 包含 isFolder 的条件之后

两者不同级，渲染函数如下

```js
;(function anonymous() {
  with (this) {
    return _c(
      "div",
      {attrs: {id: "demo"}},
      [
        _c("h1", [_v("v-for和v-if谁的优先 级高？应该如何正确使用避免性能问题？")]),
        _v(" "),
        isFolder
          ? _l(children, function (child) {
              return _c("p", [_v(_s(child.title))])
            })
          : _e()
      ],
      2
    )
  }
})
```

可见， 同级时先执行\_l(children, callback), 不同级时先 isFolder ? \_l(children, callback)

1. 显然从ompiler/codegen/index.js中可知， v-for 优先于 v-if 被解析
2. 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能
3. 要避免出现这种情况，则在外层嵌套 template，在这一层进行 v-if 判断，然后在内部进行 v-for 循环
4. 如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项
