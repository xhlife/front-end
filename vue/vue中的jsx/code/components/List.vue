<template>
  <div class="list">
      <template v-for="(item,index) in data">
          <li :key="index" v-if="!render">{{item}}</li>
          <listitem v-else :key="'a' + index" :render="render" :item="item"></listitem>
      </template>
  </div>
</template>

<script>
import listitem from './ListItem'
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        render: {
            type: Function
        }
    },
    components: {
        listitem
    }
}
</script>

<style>

</style>