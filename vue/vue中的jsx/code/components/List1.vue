<template>
  <div class="list">
      <template v-for="(item,index) in data">
          <slot :item="item" :index="index"></slot>
      </template>
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },

}
</script>

<style>

</style>