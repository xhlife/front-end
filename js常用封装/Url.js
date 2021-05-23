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

/**
 * @description 获取所有的参数
 */

export const getQuery = (url) => {
  if (url) {
    let search = url.substring(url.lastIndexOf('?') + 1);
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } else {
    let q = {};
    // replace的回调(_,k,v) k 是第一个子式([^?&=]+)的匹配值，v是第二子式([^&]+)的匹配值
    location.href.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
    return q;
  }
};
