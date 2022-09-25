/**
 * @description 将原数组拆分成若干子数组，然后合并
*/

// 关键问题： 合并两个有序数组
// A [3,27,38,43] B [9, 10, 82]
// C [3,27,38,43, 9, 10, 82]
//   p         q          r
// 方法一， 对其中一个数组在另外一个数组进行插入排序
// 方法二， 对p-r 直接进行排序

// 方法三， 将数组分为 A B 两部分， i 指向 A 待回写
//  j 指向 B 中待回写， k, C中待重写位置
// 因为 C 拆分为 A，B 因此，C等于空数组，可以随便重写
// * A， B 区间必须是排好序的区间
function merge(A,p,q,r) {
  let A1 = A.slice(p, q) // 存放左边 必须是排好序的
  let A2 = A.slice(q, r) // 存放右边 必须是排好序的
  A1.push(Number.MAX_SAFE_INTEGER) // 添加哨兵， js中 Number.MAX_SAFE_INTEGER =  9007199254740991
  A2.push(Number.MAX_SAFE_INTEGER)
  // while 循环写法
  // let len = A.length
  // let i = 0;
  // let j = 0;
  // let k = 0
  // while(len > 0) {
  //   let l = A1[i]
  //   let r = A2[j]
  //   if(l < r) {
  //     i++
  //     A[k] = l
  //   } else {
  //     j++
  //     A[k] = r
  //   }
  //   k++
  //   len--
  // }
  // for循环写法
  for(let k = p, i = 0, j = 0; k < r; k++) {
    A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
  }
  return A
}

console.log(merge([3,27,38,43, 9, 10, 82],0,4,7));

// 上面提到 merge的两个区间 A， B 必须是排好序的
// 如果将区间细分到两个， [2,1] => A[2] B[1] 那么也是排好序的
// 因此，结合递归， 就是真正的合并排序
/**
 * @param A 数组
 * @param p 需要排序的区间左侧
 * @param r 需要排序的区间的右侧
*/
function merge_sort(A,p = 0, r = A.length) {
  if(r - p < 2) return 
  const q = Math.ceil((p + r) / 2)
  merge_sort(A,p,q) // 递归左侧，直到边界条件 r - p < 2 
  merge_sort(A,q,r) // 递归右侧，直到边界条件 r - p < 2 
  return merge(A, p, q, r)
}
console.log(merge_sort([8,89,2,47,33,67,17,9,-2]));

// 总结
// 1、将数组分区，  区域自己定, p 左侧起点， r右侧起点
// 2、找到划分的中点
// 3、通过递归将区域分为左右有序的数组 比如 [2,1] => [2] [1]
// 4、重新填充数组（合并两个有序数组）