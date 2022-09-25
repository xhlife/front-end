// 从一个数组中取出 n 个数，使得他们的和为m
// & sumN([1,2,3,4,7,8,12],2,11) => [3, 8]

//解法-决策树 递归
/**
 * @param i 代表决策的次数
 * @param  decisions 决策结果
*/
function sumN(A, n, m, i=0 ,decisions = []) {
  if(m === 0) return decisions
  // 决策到达边界， 或者 n = 0也直接返回  m < 0（m小于0找不到解了，用于减枝）
  if(i === A.length || n === 0 || m < 0) return null

  // 通过决策递归 ，即 要么拿这个数，要么不拿这个数
  return sumN(A, n - 1, m - A[i], i+1, decisions.concat(A[i])) || sumN(A, n, m, i + 1, decisions)
}
console.log(sumN([1,2,3,4,7,8,12],3,13));


// 另一个解
function sumN2(A, n, m) {
  // 最终返回的结果
  let r = null

  // 决策 
  const decisions = []

  function inner( i = 0, n, m){
    // 因为没有 || 操作用于决策一个数是拿还是不拿
    // 如果 r 不为null，终止递归
    if(r) return 
    // m === 0 代表找到一个解
    if(m === 0) {
      r = decisions.slice()
      return
    }
    // 没有解
    if( i === A.length || n === 0) {
      return 
    }
    // 决策过程
    // 拿当前这个数的递归
    decisions.push(A[i])
    inner(i + 1, n - 1, m - A[i])
    // 不拿当前这个数的递归
    decisions.pop(A[i])
    inner(i+1, n, m)
  }
  inner(0, n, m)
  return r
}

console.log(sumN2([1,2,3,4,7,8,12],3,13));

/// 解法-利用位运算
// 对于 A = [1,2,3,4,5] 二进制数 10011 代表选择 [1,4,5]

function sumByBianryCode(A,code) {
  const p = [] // 选择
  let sum = 0  // 结果的和
  for(let i = 0; i < A.length; i++) {
    if(code & (1 << i)) {
      sum += A[i]
      p.push(A[i])
    }
  }
  return {sum, p}
}

function sumN3(A, n, m) {
  // 位操作 2的n次方
  const max = 1 << A.length
  for(let i = 0; i< max; i++) {
    const {sum, p} = sumByBianryCode(A,i) 
    if(sum === m && p.length === n) return p
  }
  return null
}
console.log(sumN3([1,2,3,4,7,8,12],3,13));







// 容易和 [0-1背包问题]弄混。 举例， 给定一个不重复的整数数组， 从中获取 N 个数字，使得他们的和最大? 动态规划(0-1背包)

// 一个集合，求和为M的子集，是一个NP-完成