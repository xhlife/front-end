<template>
  <div class="grandson2" @click="$listeners.son2()">
      grandson2's data from grandpa{{$attrs}}
  </div>
</template>

<script>
export default {
    // 不开启下面代码，属性会挂载在dom上
    // inheritAttrs: false
    mounted(){
        this.$listeners.son2()
    }
}
</script>

<style>

</style>
