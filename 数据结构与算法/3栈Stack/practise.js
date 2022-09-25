// 例子中的栈用 js的数组代替

// 采用栈处理递归问题

//练习1  将多维数组展平为一维 递归的方式
let arr = [[8,9],1,2,3,[4,5,[6]]]
function flatArr(arr) {
  return [].concat( ...arr.map(item => Array.isArray(item) ? flatArr(item) : item))
}

// 采用 generator的方式
// 这种写法的优势在于 genenator 默认返回一个遍历器对象
// 因此，不需要关心返回的是什么东西
function *flatArrr(arr) {
  for(let i =0; i< arr.length; i++) {
    if(Array.isArray(arr[i])) {
      // generator函数递归调用自身需要 加 * 即 yeild * 
      yield *flatArrr(arr[i])
    } else {
      yield arr[i]
    }
  }
}
const aa = flatArrr(arr)
for(let i of aa) {
  console.log(i);
}


// 采用栈解决
function flatArrr(arr) {
  const r = []
  const stack = arr.slice()
  while(stack.length) {
    const cur = stack.shift()
    if(Array.isArray(cur)) {
      stack.unshift(...cur)
    } else {
      r.push(cur)
    }
  }
  return r
}
console.log(flatArrr(arr));


// 栈与generator结合实现
function *flatArrrr(arr) {
  const stack = arr.slice()
  while(stack.length) {
    const cur = stack.shift()
    if(cur.constructor === Array) {
      stack.unshift(...cur)
    } else {
      yield cur
    }
  }
}
const aaa = flatArrrr(arr)
for(let i of aaa) {
  console.log(i);
}


// 练习2 采用栈实现深度优先查询
 
function deep_first_search(node) {
  const stack = node.slice()

  while(stack.length) {
    const item = stack.pop()
    // 如果存在children， 那么解构
    if(item.children) {
      stack.push(...item.children)
    }
  }
}


// 练习3 括号平衡问题
// ()[]{} ， [{}()] 这种平衡的
// ([](), )({}[] 非平衡的
function is_balanced(str) {
  const arr = [...str]
  const stack = [arr.shift()]
  while(arr.length) {
    const n = stack[stack.length-1]
    const c = arr.shift()
    const is_matched = is_match(n,c)
    if(is_matched) {
      stack.pop()
    } else {
      stack.push(c)
    }
  }
  return stack.length === 0
}
function is_match(n,c) {
  return (n==='[' && c === ']') ||  (n==='(' && c === ')') || (n==='{' && c === '}')
}
console.log(is_balanced('[](){}'), is_balanced('[](){}('));