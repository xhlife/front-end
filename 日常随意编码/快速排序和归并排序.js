// 归并排序

function merge(left,right){
    let res = []
    while (left.length && right.length) {
        if(left[0]<right[0]){
            res.push(left.shift())
        }else{
            res.push(right.shift())
        }
    }
    return res.concat(left).concat(right)
}

function mergeSort(arr){
    if(arr.length < 2) return arr
    let middle = Math.floor(arr.length / 2)

    let left = arr.slice(0,middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left),mergeSort(right))
}

// 快速排序

function swap(arr,i,j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function quick(arr,start,end){
    let point = arr[end]
    let tmpEnd = end
    while(start != end){
        arr[start] < point ? start++ : swap(arr,start,--end) 
    }
    // 最后，将基准值交换
    swap(arr,end,tmpEnd)
    return end
}

function quickSort(arr,start=0,end=arr.length-1){
    if(end - start <=1) return
    let mid = quick(arr,start,end)

    quickSort(arr,start,mid-1)
    quickSort(arr,mid+1,end)
}