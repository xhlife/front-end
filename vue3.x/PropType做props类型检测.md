### 引入
```js
import { PropType} from 'vue'
```

### 定义接口 
```ts
export interface XXX {
  text: string,
  is: boolean
}
```

### 属性验证
```js
props: {
  test: {
    type: Object as PropType<XXX>
    default: () =>({})
    ...
  }
}
```