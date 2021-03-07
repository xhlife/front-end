<template>
  <div class="grandson1">
      grandson1's  money {{value}}
      <!-- <button @click="$parent.$emit('update:value',400);$parent.$emit('input',400)">孙崽按钮</button> -->
      <button @click="$dispatch('update:value',400);$parent.$emit('input',400)">孙崽按钮</button>
  </div>
</template>

<script>
export default {
    props:{
        value: {
            type: Number,
            default: 1
        }
    },
    mounted(){
        this.$bus.$on('bus',(data) => {
            console.log(data);
        })
    }
}
</script>

<style>

</style>>
