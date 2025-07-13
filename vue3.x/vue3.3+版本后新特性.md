

### 泛型组件 3.3
```js
<script setup lang="ts" generic="T"></script>
```

场景	示例
动态数据列表	generic="T extends { id: number }"
表单控件	generic="T extends string | number"
高阶组件	generic="T, P extends Record<string, any>"
插槽类型传递	defineSlots<{ default: (props: { item: T }) => any }>()

### 模板编译  3.4

Vue 使用递归下降解析器，它依赖于许多正则表达式和前瞻搜索。新的解析器使用基于 htmlparser2 中的分词器的状态机分词器，该分词器仅循环访问整个模板字符串一次


### defineModel

简化 modelValue 与 update:modelValue

```ts
// 声明 "modelValue" prop，由父组件通过 v-model 使用
const model = defineModel()
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })

// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"

// 声明 "count" prop，由父组件通过 v-model:count 使用
const count = defineModel("count")
// 或者：声明带选项的 "count" prop
const count = defineModel("count", { type: Number, default: 0 })

function inc() {
  // 在被修改时，触发 "update:count" 事件
  count.value++
}
```


### v-bing同名速记

```html
<img :id :src :alt>
```

### defineProp 响应式解构


解决结构props响应式丢失问题，3.5版本之前采用 toRefs,然后解构


### useId()

### useTemplateRef()

获取dom 元素不用再与ref属性名一致， 同时会自动推断类型，也支持泛型

```html
<script setup>
	import {useTemplateRef,onMounted} from 'vue'
	const divRef = useTemplateRef("div");
	onMounted(() => {
	  console.log(divRef.value);
	});
<script/>

<template>
  <div ref="div">我是div</div>
</template>
```

### watch的deep可以数字， 表示最大遍历深度

### watchEffect的stop, pause, resume

### 


