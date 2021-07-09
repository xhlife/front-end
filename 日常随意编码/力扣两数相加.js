let arrOf = Array.of(1, 2, 3, 4)
// console.log(arrOf)

// 力扣  两书相加
function add(arr, targe) {
  let cache = new Map()
  for(let i = 0; i < arr.length; i ++){
    let dis = targe - arr[i];
    if(cache.has(dis)){
      // console.log(cache);
      return [cache.get(dis),i]
    }else{
      cache.set(arr[i],i)
    }
  }
}


function add2(arr, targe) {
  let cache = {}
  for(let i = 0; i < arr.length; i ++){
    let dis = targe - arr[i];
    if(arr[i] in cache){
      return [cache[arr[i]],i]
    }else{
      cache[dis] = i
    }
  }
}

let a = add2([2,7,11,15], 9)
console.log(a);
