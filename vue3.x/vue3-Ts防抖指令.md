```typescript
import { App, Component, DirectiveBinding, VNode } from 'vue';

type voidFn = (...args: any[]) => void;
function debounce(fn: voidFn, delay?: number | string, immediate?:boolean): voidFn {
  if (delay === undefined) {
    delay = 500;
  }
  if (immediate === undefined) {
    immediate = false;
  }
  let timer: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
      console.log('请勿频繁操作');
    };
    if (immediate) {
      const callnow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, Number(delay));
      if (callnow) fn(...args);
    } else {
      timer = setTimeout(() => {
        fn(...args);
      }, Number(delay));
    }
  };
}
export default {
  install(Vue: App, options: Component) {
    Vue.directive('debounce', {
      // v-debounce:click.1000="test"
      // arg 指令参数:click value 指令接受的值: test， modifiers修饰符: 1000
      beforeMount(el: HTMLElement, { arg, value, modifiers }, vnode: VNode) {
        // 获取时间  使用的时候必须放前面
        let modifiersList = modifiers && Object.keys(modifiers);
        let delay = (modifiersList.length && modifiersList[0]) || 500;
        let immediate = modifiers.immediate || false;
        let d_fn = debounce(value.bind(vnode), delay, immediate);
        el.addEventListener(arg || 'click', (ev) => {
          d_fn(ev);
        });
      },
    });
  },
};

```

```html
<!-- 不传递参数 -->
<div v-debounce:[event].3000.immediate="test">
  123hhh
</div>
<!-- 传递参数 -->
<div v-debounce:[event].3000.immediate="test.bind('1', '2')">
  123hhh
</div>
<script>
...
...

methods: {
  test(t1, t2, ev){
    console.log(t1, t2, ev)
  }
}
</script>
```