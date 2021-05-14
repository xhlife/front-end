const getStyle = function(dom,attr){
  if(dom.currentStyle){
    return dom.currentStyle[attr]
  }else{
    return window.getComputedStyle(dom,null)[attr];
  }
}