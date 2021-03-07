export default {
    props: {
        render: {
            type: Function
        },
        item: {
            type:String,
        }
    },
    render(h){
        return this.render(h,this.item)
    }
}