var Public = {} // 发布者
Public.subscriber = [] // 存放订阅者的回调，实质就是订阅者
Public.listen = function(fn){  // 新增订阅消息
  this.subscriber.push(fn) // 现在不管订阅什么，都往里面放
}
Public.trigger = function(){
  for(var i =0,fn; fn = this.subscriber[i++];){
    fn.apply(this,arguments)
  }
}