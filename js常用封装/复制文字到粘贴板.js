const copyText = function (val) {
  let input = document.createElement("input")
  input.value = val
  document.body.appendChild(input)
  input.select()
  // 让浏览器执行拷贝值的操作
  document.execCommand("Copy")
  document.removeChild(input)
}

// execCommand 可能会被废弃， 可以采用 navigator.clipboard.writeText 代替
// 这个api返回的是一个promise 对象

const promise = navigator.clipboard.writeText("test")

promise.then(
  success => {
    console.log(success)
  },
  fail => {
    console.log(fail)
  }
)
