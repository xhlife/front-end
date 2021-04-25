/**
 * 深度合并对象，Object.assign()合并只有第一层属性是深拷贝，二层下的都是浅拷贝
 * 因此，递归执行Object.assign();
 * @param target 目标对象
 * @param ...sources  被合并的资源
 */
export default function mergeDeep(target, ...sources){
  if(!sources.length) return target;
  const source = sources.shift();  // 取出第二个参数
  // 目标和资源都是对象
  if(isObject(target) && isObject(source)){
    // 循环资源
    for(const key in source){
      // 如果资源的属性的值也是对象
      if(isObject[source[key]]){
        if(!target[key]){
          // 先新开一个对象，防止污染原对象
          Object.assign(target,{[key]:{}});
          // 再拷贝值
          mergeDeep(target[key], source[key]);
        }
      }else{
      // 如果属性的值为原始值，那么直接通过assign合并
        Object.assign(target,{[key]:source[key]})
      }
    }
  }
  // 最后，递归执行后续需要合并的对象
  return mergeDeep(target,...sources)
}

function isObject(item){
  // 必须是对象，不能是数组，或者null
  return (item && typeof item === 'object' && !Array.isArray(item))
}