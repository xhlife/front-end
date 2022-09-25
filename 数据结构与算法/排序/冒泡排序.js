function bubble_sort(A){
  for(let i = A.length - 1; i>=1 ; i--) {
    for(let j = 1 ; j<= i; j++) {
      A[j - 1] > A[j] && ([A[j-1],A[j]] = [A[j], A[j-1]])
    }
  }
  return A
}

console.log(bubble_sort([3,8,2,6,4,-1]));
