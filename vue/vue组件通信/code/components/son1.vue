<template>
  <div class="son1">
      son's money {{value}}
      <button @click="change">点击修改</button>
      <Grandson1 :value="value" @appsay="say"></Grandson1>
  </div>
</template>

<script>
import Grandson1 from './Grandson1'
export default {
    name: 'son1',
    components: {
        Grandson1
    },
    props: {
        value: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        change(){
            // update:value  ， : 后面的可以被当做需要的值
            this.$emit('update:value',200)
            this.$emit('input',300)
        },
        say(value){
            console.log(value)
        }
    }
}
</script>

<style>

</style>
