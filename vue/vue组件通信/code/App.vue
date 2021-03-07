<template>
  <div id="app">
      <parent></parent>
  </div>
</template>

<script>
import parent from './components/parent'
export default {
    name: 'App',
    components: {
        parent,
    },
    mounted(){
        // 只要组件绑定 say 方法的都会接收到这个消息
        this.$broadcast('appsay','i am app')
    }
}
</script>

<style>

</style>