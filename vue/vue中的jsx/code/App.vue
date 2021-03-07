<template>
  <div id="app">
      <level1 type='1'>标题1</level1>
      <level1 type='2'>标题2</level1>
      <level1 type='3'>标题3</level1>
      <hr>
      <!-- <Levelfunc></Levelfunc> -->
      <Levelfunc type="1">标题1</Levelfunc>
      <Levelfunc :type="2">标题2</Levelfunc>

      <hr>
      <br>
      <!-- i-view 封装的写法 -->
      <List :data="['香蕉','苹果','西瓜']" :render="render"></List>
      <br>
      <!-- element-ui的封装写法 -->
      <!-- 通过prop传进去，通过slot传出来 -->
      <List1 :data="['香蕉','苹果','西瓜']">
          <template v-slot="{item,index}">
              <li>{{item}}{{index}}</li>
          </template>
      </List1>
  </div>
</template>

<script>
// 实现小组件， 标题level h1-h6
// 方式一、 template 组件方式
import Level1 from './components/level1'
// 方式二、函数式组件 render()函数
import Levelfunc from './components/levelFunction'
    //   通过render 定制组件
import List from './components/List'

// 作用域插槽
import List1 from './components/List1'
export default {
    components: {
        Level1,
        Levelfunc,
        List,
        List1
    },
    methods:{
        render(h,data){
            return <span>{data}</span>
        }
    }
}
</script>

<style>

</style>
