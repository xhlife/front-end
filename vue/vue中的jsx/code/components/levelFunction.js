export default {
    props: {
        type: {
            type: [String,Number],
            default: 1
        }
    },
    render(/* h */){ // createElement
        //  h(标签名,{属性},内容)
        // return h('h1', {},'你好')
        /* return h('h1',{
            on:{
                click(){
                    alert('hhh')
                }
            }
        },['标题--',h('span',{},'可以点击'),h('button',{on:{click(e){
            e.stopPropagation()
            alert('xixi')
            
        }}},'点我')]) */

        //jsx语法
        // return <h1>标题1</h1>
        let tag = `h${this.type}`
        return <tag>{this.$slots.default}</tag>
    }
}