import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$bus = new Vue(); // event bus
// 向上通知
Vue.prototype.$dispatch = function(eventName,value){
    // 父亲只有一个
    let parent = this.$parent;
    while (parent) {
        parent.$emit(eventName,value);
        parent = parent.$parent
    }
}
// 向下派发
Vue.prototype.$broadcast = function(eventName,value){
    // 孩子可有多个,需要使用递归
    let broadcast = (childreList) => {
        childreList.forEach(child => {
            child.$emit(eventName,value);
            if(child.$children){
                broadcast(child.$children)
            }
        })
    } 
    broadcast(this.$children)
}
new Vue({
    el: '#app',
    render: h => h(App)
})