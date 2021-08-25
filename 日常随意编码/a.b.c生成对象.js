function setKey(obj,key,value){
  if(!key) return obj
  let list = key.split('.')
  if(list.length === 1)  {
    obj.key = value;
    return obj
  }
  let idx = list.length -1
  let lastObj = {}
  lastObj[list[idx]] = value
  idx--
  while(idx > 0){
    let temp = {}
    temp[list[idx]] = lastObj
    lastObj = temp
    idx--
  }
  obj[list[0]] = lastObj
  return obj
}

let a = setKey({test:1},'a.b.c','hhh')
let b = setKey({test:2},'a.b.c.e.d','success')
console.log(a);
console.table(b);


