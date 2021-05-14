const copyText = function(val){
  let input = document.createElement('input');
  input.value = val;
  document.body.appendChild(input);
  input.select();
  // 让浏览器执行拷贝值的操作
  document.execCommand('Copy');
  document.removeChild(input)
}