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
