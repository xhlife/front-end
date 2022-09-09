

```js
import Vue from 'vue'

export function create(Component, props) {
  // 组件的构造函数如何获取
  // 1. Vue.extend() 
  // 2.  render 函数 下面代码采用这种方法， 也可以采用上面都方式

  const vm = new Vue({
    // h 是 createElement, 返回 VNode， 可以通过 $mount(domId) 进行指定挂载,
    // $mount() 如果不传入宿主对象， 则会创建真实的dom，但是不会追加操作
    render: h => h(Component, {props})
  }).$mount()

  // 因为没有追加， 所以可能通过 $el 获取真实的dom
  document.body.appendChild(vm.$el)

  // 为什么不直接 $mount(body)？  因为这样会直接把其他内容都干掉（相当于删库跑路）

  // 通过 $children 获取 组件实例
  const comp = vm.$children[0]

  // 用完之后 需要销毁，不能只是 appendChild
  comp.remove = function() {
    document.body.removeChild(vm.$el) // 删除dom
    vm.$destroy() // 释放内存
  }
  // 返回组件实例
  return comp
}



// 采用 extend 方式创建组件实例
export function _create(Component, props) {
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({propsData: props})
  comp.$mount()

  document.body.append(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
}
```

可以用于全局的弹出实现等

在这个基础上，我们加入 install属性 

```js
import Vue from 'vue'

export function create(Component, props) {
  // 组件的构造函数如何获取
  // 1. Vue.extend() 
  // 2.  render 函数 下面代码采用这种方法， 也可以采用上面都方式

  const vm = new Vue({
    // h 是 createElement, 返回 VNode， 可以通过 $mount(domId) 进行指定挂载,
    // $mount() 如果不传入宿主对象， 则会创建真实的dom，但是不会追加操作
    render: h => h(Component, {props})
  }).$mount()

  // 因为没有追加， 所以可能通过 $el 获取真实的dom
  document.body.appendChild(vm.$el)

  // 为什么不直接 $mount(body)？  因为这样会直接把其他内容都干掉（相当于删库跑路）

  // 通过 $children 获取 组件实例
  const comp = vm.$children[0]

  // 用完之后 需要销毁，不能只是 appendChild
  comp.remove = function() {
    document.body.removeChild(vm.$el) // 删除dom
    vm.$destroy() // 释放内存
  }
  // 返回组件实例
  return comp
}

// import Notice form 'xxx'
export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      // 可以在这里做更多的操作，可以做单例模式，否则就是多例的
      // 等等一系列的操作
      return create(Notice, options)
    }
  }
}
```