function longest_sub_str(str) {
  const len = str.length
  const map = {}
  let right = 0
  let long = 0
  let res = ''
  for( let left = 0; left < len; left++) {
    
    if( left !== 0) {
       delete map[str[left-1]]
    }
    while(right < len && !map.hasOwnProperty(str[right])) {
      map[str[right]] = ''
      right++
    }
    const l = right - left
    if(long < l) {
      long = l
      res = str.substring(left, right)
    }
  }
  return {
    long,
    res
  }
}

console.log(longest_sub_str('cdasdga'));
console.log(longest_sub_str('abcabcbb'));
console.log(longest_sub_str('pwwkew'));
console.log(longest_sub_str('bbbbb'));