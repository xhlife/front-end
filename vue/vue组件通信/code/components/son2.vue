<template>
  <div class="son2">
      son2's data from parent: {{$attrs}}
      <Grandson2 v-bind="$attrs" v-on="$listeners"></Grandson2>
      <!-- <p>{{this.$refs.son2.addr}}</p> -->
      <p>通过inject进来的数据:{{this.parent.mny}}</p>
  </div>
</template>

<script>
import Grandson2 from './Grandson2'
export default {
    name: 'son2',
    // 不让属性挂载在标签上
    inheritAttrs: false,
    components: {
        Grandson2
    },
    inject: [ 
        'parent'  // 这样this.parent 将会获得父组件实例
    ],
    data(){
        return {
            sp: '我是son2独有数据'
        }
    },
    mounted(){
        this.$bus.$emit('bus','我是event bus')
    }
}
</script>

<style>

</style>