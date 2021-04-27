/**
* @description 递归方式实现深拷贝
* @param {obj} 需要拷贝的对象
* @return {copyValue} 深拷贝后的对象
*/
export const recursionDeepClone = function(obj){
  // 原始值类型
  if(obj === null || (typeof obj !== 'object')){
    return obj;
  }
  let copyValue;
  // 如果是事件对象
  if( obj instanceof Date){
    copyValue = new Date();
    copyValue.setTime(value.getTime());
    return copyValue;
  }
  if(obj instanceof Array){
    copyValue = [];
    for(let i = 0, len = obj.length; i < len; i++){
      copyValue[i] = recursionDeepClone(obj[i]);
    }
    return copyValue
  }
  if(obj instanceof Object){
    copyValue = {};
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        copyValue[key] = recursionDeepClone(obj[key])
      }
    }
    return copyValue;
  }
}

/**
* @description JSON的api实现深拷贝
* @param {obj} 需要拷贝的对象
* @return {copyValue} 深拷贝后的对象
*/
export const jsonDeepClone = function(obj){
  if(obj === null || (typeof obj !== 'object')){
    return obj
  }
  let temp = JSON.stringify(obj);
  return JSON.parse(temp)
}