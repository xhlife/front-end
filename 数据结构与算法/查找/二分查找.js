/**
 * @description 二分查找
 * 思路： 每次二分中点下标 g, 左边界 l, 右边界
 * 每次二分之后， 重置 l, r , g
*/
function bSearch(A, t) {
  let l = 0;
  let r = A.length - 1;
  let g = Math.ceil(r / 2)
  while(l <= r) {
    if(A[g] === t) return g
    else if(A[g] > t) {
      r = g - 1
    } else {
      l = g + 1
    }
    g = Math.ceil((r+l) / 2)
  }
  return -1
}

console.log(bSearch([1,5,9,13,22,31,45,67],88));
console.log(bSearch([1,5,9,13,22,31,45,67],31));
console.log(bSearch([1,5,9,13,22,31,45,67],5));