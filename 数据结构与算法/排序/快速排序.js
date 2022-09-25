
/**
 * 
 * @description 快速排序
 * 思路： 根据基值，将数组分为左右两侧，左边比基值小，右边比基值大，递归执行
 */

function quick(arr,l,r) {
  const point = arr[r]
  const tmp = r
  while(l < r) {
    arr[l] < point ? l++ : swap(arr,l,r--)
  }
  return tmp
}

function quick_sort(arr,l=0, r = arr.length-1) {
  if(r - l <=1) return
  const mid =quick(arr,l,r)
  quick_sort(arr,l,mid-1)
  quick_sort(arr,mid+1,r)
  return arr
}


function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

console.log(quick_sort([10,50,80,90,30,60]));

// 如何优化优化快速排序
// 让拆分更加平均 =》 
// 1. 随机打乱原数组O(n)
// 2. 使用中位数做中点划分区域 O(n)
// 3. 找三个树，取中间数字o(1)累计
