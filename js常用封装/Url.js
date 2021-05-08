/**
 * @description 获取指定name的url参数
 * @param {*} name 参数名
 */
export const getUrlDecodeParam = function(name){
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if(r !== null){
    return decodeURIComponent(r[2])
  }else{
    return null;
  }
}