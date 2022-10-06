function findMedianArrays(arr1, arr2) {
  const res = []
  const length = arr1.length + arr2.length
  arr1.push(Number.MAX_SAFE_INTEGER)
  arr2.push(Number.MAX_SAFE_INTEGER)
  for(let k = 0, i = 0, j = 0; k<length; k++) {
    if(arr1[i] < arr2[j] && arr1[i]) {
      res[k] = arr1[i++]
    } else if(arr1[i] > arr2[j] && arr2[j]) {
      res[k] = arr2[j++]
    }
  }
  let i = 0
  let j = 0
  const t = length / 2
  if(length % 2 !== 0) {
    i = Math.floor(t)
  } else {
    i = t - 1
    j = t
  }
  return j ? (res[i] + res[j]) / 2 : res[i]
}

findMedianArrays([1,3],[2])
findMedianArrays([1,2],[3,4])

// 时间复杂度 O（m + n） 空间复杂度 O(m + n)

// 时间复杂度 为 O(log(m+n)) 解法

// 二分法
function test(arr1, arr2) {
  const len1 = arr1.length
  const len2 = arr2.length
  const totalLen = len1 + len2
  
  if(totalLen % 2 === 1) { // 奇数
    const mid = Math.floor(totalLen / 2)
    const median = getKthElement(arr1, arr2, mid + 1)
    return median
  } else {
    const mid1 = totalLen / 2 -1
    const mid2 = totalLen / 2
    const medain = (getKthElement(arr1, arr2, mid1) + getKthElement(arr1, arr2, mid2)) / 2
    return medain
  }
}

// arr1 , arr2 两个数组，  k  为两个数组的中位数的位置 
function getKthElement(arr1, arr2, k) {
  const len1 = arr1.length
  const len2 = arr2.length
  let index1 = 0
  let index2 = 0

  while(true) {
    // 边界处理
    if(index1 === len1) { // 数组1已经为空
      return arr2[index2 + k - 1]
    }
    if(index2 === len2) {
      return arr1[index1 + k -1]
    }

    if(k == 1) {
      return Math.min(arr1[index1], arr2[index2])
    }

    // 正常情况
    const half = Math.floor(k / 2)
    const newIndex1 = Math.min(index1 + half, len1) - 1  // k / 2 - 1
    const newIndex2 = Math.min(index2 + half, len2) - 1
    const pivot1 = arr1[newIndex1]
    const piovt2 = arr2[newIndex2]
    if(pivot1 <= piovt2) {
      k -= newIndex1 - index1 + 1
      index1 = newIndex1 + 1
    } else {
      k -= newIndex2 - index2 + 1
      index2 = newIndex2 + 1
    }
  }
}