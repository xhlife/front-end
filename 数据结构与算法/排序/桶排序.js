//桶排序，是将待排序的数字分桶， 然后桶内的数字单独排序，然后再输出

//  比如下面例子

// [29, 25, 3, 49, 9, 37, 21, 43]

// 根据一个值（这个值自定义，值的大小回影响性能）进行分区
// 比如按 10个空间进行分区
// [0-9], [10- 19], [20-29], [30-39] [40- 49]
// 然后根据数字大小，放入对应的桶
/**
 * [0-9]  3,9
 * [10-19] 
 * [20-29] 21 25 29
 * [30-39] 37
 * [40-49] 49 43
 * [49-...]  
*/
// 然后将桶内元素采用插入排序(为什么是插入排序, 因为长度8-16之间，性能好)，排好序进行输出

/**
 * @param A 数组
 * @param k 桶的数量
 * @param s 区间的跨度
*/

function bucket_sort(A, k, s) {
  const buckets = Array.from({length: k}, () => [])
  for(let i = 0; i < A.length; i++) {
    // 通过除以区间，找到对应的桶位置， 比如 s = 10, A[i] = 3; 3 / 10, index= 0; 19/10 index=1
    const index = ~~(A[i] / s)
    buckets[index].push(A[i])
  }
  // 对每个桶进行插入排序
  for(let i = 0; i < buckets.length; i++) {
    insert_sort(buckets[i])
  }
  return [].concat(...buckets)
}


function insert_sort(A) {
  for(let i = 1; i< A.length; i++) {
    let p = i-1
    const tmp = A[i]
    while(p && A[p] > tmp) {
      A[p+1] = A[p]
      p--
    }
    A[p+1] = tmp
  }
}

console.log(bucket_sort([29, 25, 3, 49, 9, 37, 21, 43], 5, 10 ));