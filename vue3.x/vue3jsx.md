### 安装支持

```sh
npm i @vitejs/plugin-vue-jsx
```

```js
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
});
```

### 例子

```jsx
import type {SetupContext} from "vue"

type FComponentProps = {
  render: Function
  row: RowData
  col: ColItem
}

type Events = {
  sendMessage(message: string): void
}
export function FComponent(props: FComponentProps, context: SetupContext<Events>) {
  return <>{props.render(props.row, props.col)}</>
}

export interface ColItem {
  prop: keyof RowData
  label: string
  render: Function
}

export interface RowData {
  go: number
  test: string
}

export const tableCol:ColItem[] = [
  {
    prop: "test",
    label: "test",
    render(row: RowData, col: ColItem) {
      return <div>{row[col.prop]}</div>
    }
  },
  {
    prop: "go",
    label: "go",
    render(row: RowData, col: ColItem) {
      return <div>{row[col.prop]}</div>
    }
  }
]
```

```vue
<template>
  <div ref="editorWrapElRef">
    <el-table :data="elData">
      <el-table-column v-for="col in tableCol" :key="col.prop">
        <template #default="{row}">
          <FComponent :row="row" :render="col.render" :col="col"></FComponent>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs, } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus';
import { tableCol, FComponent } from './tableColumn';
const elData = [
  {
    test: 123,
    go: 456
  },
  {
    test: 13903,
    go: 349749
  }
]
</script>
<style lang="scss" scoped>

</style>

```
