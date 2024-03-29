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


// 写一个程序， 解析下面的 queryString, 返回对象
// a.name = ramroll & a.dress&x=1&y=

// 其实就是qs库的string的parse函数
function parse(str) {
  return str.split('&').reduce((res,cur) => {
    const [k,v] = cur.split('=')
    if(!v) return res
    res[k] = v
    return res
  },{})
}

console.log(parse('a=1&b=&c=5&f=hello'));
console.log(parse('a&b&c')); 
// 这道题也考了url的标准,下面这三种情况都是不满足要求的
console.log(parse('a[name]=fox&a[company=tencent]&b=why'));
console.log(parse('color=Deep%20Blue'));
console.log(parse('a[0]=1&a[1]=2'));
console.log('-----------');

function parse1(str) {
  return str.split('&').reduce((res,cur) => {
    const [k,v] = cur.split('=')
    if(!v) return res
    // res[k] = v
    // k.split(/[\[\]]/).filter(x => x) 后，得到一个数组
    // 例如 a[name] => [a, name], a[name][name] => [a,name, name]
    deep_set(res, k.split(/[\[\]]/).filter(x => x), v)
    return res
  },{})
}

function deep_set(res, path, v) {
  let i = 0;
  for(; i < path.length - 1; i++) {
    if(res[path[i]] === undefined) {
      // 检测key是够是一个数字，是的话赋予数组
      if(path[i+1].match(/^\d+$/)) {
        res[path[i]] = []
      } else {
        res[path[i]] = {}
      }
    }
    res = res[path[i]]
  }
  res[path[i]] = decodeURIComponent(v)
}

console.log(parse1('z=1&a[name]=fox&a[company=tencent]&b=why'));
console.log(parse1('a[0]=1&a[1]=2'));
console.log(parse1('color=Deep%20Blue'));
