var Public = {}
Public.subscriber = {}

Public.listen = function(key,fn){
  if(!this.subscriber[key]){
    this.subscriber[key] = []
  }
  this.subscriber[key].push(fn)
}
Public.trigger = function(){
  var key = Array.prototype.shift.call(arguments),
      fns = this.subscriber[key]

  if(!fns || fns.length === 0){
    return false
  }
  for(var i =0,fn;fn=fns[i++];){
    fn.apply(this,arguments)
  }
}

Public.remove = function(key,fn){
  var fns = this.subscriber[key]
  if(!fns){  // 没人订阅此消息
    return false
  }
  if(!fn){ // 不指定移除哪个，那么移除所有的
    fns && (fns.length = 0)
  }else{
    for(var i = fns.length -1; i >= 0; i--){
      if(fn === fns[i]){
        fns.splice(i,1)
      }
    }
  }
}