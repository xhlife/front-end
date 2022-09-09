### el-form组件结构

```html
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
</el-form>

<script>
export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
  }
</script>
```
首先形成这种结构，采用的是slot

> 三层的传值，采用采用什么方式呢？

内部采用的是 provide/inject，传递this

对于普通的标签属性采用 v-bind=$attrs

```js
// 在 el-form 组件中， 直接提供 this

// 这样下层组件 inject: ['form'] 后，可以直接通过实例拿到对象
provide() {
  return {
    form: this
  }
}
```

> 内部是怎么知道哪个item 对应哪个数据模型以及rules

el-form-item需要传递一个 prop属性

> 如何校验规则?

源码采用的是async-validate这个包，具体用法看文档

需要注意的是，有些可能不传递 prop 属性，因此需要对孩子字节进行过滤，prop 的就不校验,防止报错

源码是有一个fields[]数组维护， 在组件 create的时候进行监听

```js
created() {
  this.$on('el.form.addField', (field) => {
    if(field) {
      this.fields.push(field)
    }
  })
}
```

> 对孩子节点过滤或者获取父组件实例，采用$parent 或 $children吗？

从直观意义上来说，确实应该这么拿

但是如果用户不按照三层模型来编写(比如下面这样)，那么代码就会出现问题

```html
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <other-component> 
    <el-form-item label="名称">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
  </other-component>
</el-form>
```

为了防止这种$parent或$children带来的耦合性， 不用$parent, $children

采用 广播 和 派发的方式