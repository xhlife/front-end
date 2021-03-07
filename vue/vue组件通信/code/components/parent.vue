<template>
  <div class="parent">
     father's money {{mny}}
     <Son1 :value="mny" @update:value="change"></Son1>
     <hr>
     <p>v-model绑定的，只能触发input事件</p>
     <Son1 v-model="mny"></Son1>
     <hr>
     <Son1 :value.sync="mny"></Son1>
     <br>
     <br>
     <br>
     <hr>
     <Son2 name="son2" age="100" addr="银河" @son2="son()" ref="son2"></Son2>
     <p>refs方式: {{this.$refs.son2.sp}}</p>
  </div>
</template>

<script>
import Son1 from './son1.vue';
import Son2 from './son2'
export default {
    name: 'parent',
    components: {
        Son1,
        Son2
    },
    // 通过 provide 暴露父组件
    provide(){
        return {
            parent: this
        }
    },
    data(){
        return {
            mny: 100
        }
    },
    mounted(){
        console.log(this.$refs);
    },
    methods: {
        change(value){
            this.mny = value;
        },
        son(){
            console.log('click on me');
        }
    }
}
</script>

<style>

</style>