/**
 * @description 默认手头上的牌都是有序的, 每次拿到排之后插入对应的位置
 * @param A 有序的数组
 * @param x 需要插入的值
*/

// js原始实现
const a = [1, 3,4,5,8 ,19]
const x = 6
const idx = a.findIndex(i => {
  return i > x
})
a.splice(idx === -1 ? a.length : idx, 0, x)
console.log(a);

// 利用指针思维实现

function insert(A, x) {
  // p 先指向末位， 从后往前寻址，
  // p + 1指向一个空位， 这个空位是用于插入或者交换的
  let p = A.length - 1;
  //条件： 指针大于0 ，并且当前值比需要插入的 x 要大
  while(p >= 0 && A[p] > x) {
    // 只要比x 大，那么将值忘后移，空出位置
    A[p + 1] = A[p]
    p--
  }
  // 最后， p + 1的位置，就是待插入的位置
  A[p+1] = x
}

/**
 * @description 根据上面的思维，实现完整的插入排序
 * @param A 无序数组 
 * 相对于有序的数组，无序的数组需要将第一项作为有序，然后便利后面所有的项，进行插入
 * 下面这种写法是改变原本数组的，如果不希望改变原本数组，新起一个数组
*/
// 改变原本数组的实现
function inserts(A, i, x) {
  let p = i -1
  while( p>= 0 && A[p] > x) {
    A[p+1] = A[p]
    p--
  }
  A[p+1] = x
}
function insert_sort(A) {
  // p 指向当前， i其实就是 p+1指向待交换
  // 采用的是交换的思维，而不是插入空位（其实思想差不多）
  for(let i = 1; i < A.length; i++) {
    let p = i - 1;
    // 备份一次 p + 1，不然后面交换会发生数据丢失
    let tmp = A[i]
    while(p >= 0 && A[p] > tmp) {
      // 这一步会修改数组本身
      // 比如 排序 [2,1] i = 1, p = 0 , A[p] = 2, 就变成[2,2]
      // 后面通过 A[p+1] = tmp 就变回了 [1,2], 此时p = -1
      A[p+1] = A[p]
      p-- 
    }
    A[p+1] = tmp
    // 如果采用函数的方式，就不需要备份 tmp = A[i], 其实是参数当作备份了
    // 
    // inserts(A, i , A[i])
  }
  return A
}
console.log(insert_sort([2,1,5,3, -1, 18, 9, 21, 11, 14]));


// 不改变原本数组的实现

function insert_sort_new(A) {
  let res = [A[0]]
  for(let i = 1 ;i < A.length; i++) {
    inserts(res, i , A[i])
  }
  return res
}
console.log(insert_sort_new([2,1,5,3, -1, 18, 9, 21, 11, 14]));


// 思考， 如果使用类似二分查找优化插入排序的insert过程？速度会变快吗？ 代码如何写？
