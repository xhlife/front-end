const twoSum = (nums, target) => {
  const map = new Map() // {nums[i]: i }
  for(let i = 0; i < nums.length; i++) {
    const dis = target - nums[i]
    if(map.has(dis)) {
      return [map.get(dis), i]
    } else {
      // value: index
      map.set(nums[i], i)
    }
  }
  return false
}

// console.log(twoSum([3, 3, 4], 6));

// leet code 3 -- 最长无重复子串长度
// 滑动窗口
const lengthOfLongestSubstring = (s) => {
  let max = -1
  let r = -1
  const len = s.length
  const set = new Set()
  for(let i = 0 ; i < len; i++) {
    if(i !== 0) {
      set.delete(s[i-1])
    }
    while(r + 1 < len && !set.has(s[r+ 1])) {
      set.add(s[r + 1])
      ++r
    }
    max =  Math.max(max, r - i + 1)
  }
  return max
}

// console.log(lengthOfLongestSubstring('pww'))

/*
* leet code 5 最长回文子串
*/
//  中心扩展法
const longestPalindrome = (s) => {
  if(s.length < 2) return s
  let start = 0
  let end = 0
  for(let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i)
    let len2 = expandAroundCenter(s, i, i + 1)
    let len = Math.max(len1, len2)
    if(len > end - start) {
      // 为什么 计算 start  要 len - 1
      // 确保左侧不溢出
      // 以 aa 为例子
      // 当 i = 0 时， len1 = 1, len2 = 2
      // start = i - len / 2 =>  0 - 1 = -1; 左侧溢出
      // 如果 start = i - (len - 1) / 2 = 0 - 0 = 0
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.substring(start, end + 1)
  function expandAroundCenter(s, left, right) {
    // pwpp 为例子
    // 1 -> left--. right++
    // left: 0, right 2
    // left-- . right++
    // left: -1. right 3
    // len = right - left - 1
    while(left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    return right - left - 1
  }
}

// 动态规划法
// 转移方程 P(i,j) = P(i+ 1, j-1)^(S[i] === S[j])
// 解析 如果 i 到 j区间是回文串， 那么 i + 1 到 j-1 区间必定是回文串
// 边界条件， 即 长度为 1 或 2 时，1的时候，肯定是回文串， 2的时候如果s[i] === s[i+1]那么是回文串
const longestPalindrome2 = (s) => {
  if(s.length < 2) return s
  // 二维数组，代表 dp[i][j]是否是回文串
  const dp = []
  for(let i = 0; i < s.length; i++) {
    dp[i] = Array(s.length)
  }
  // 所有单个字符都是回文
  for(let i = 0; i< s.length; i++) {
    dp[i][i] = true
  }
  // 枚举长度， 长度从 2 开始，因为长度为1都是回文串
  for(let L = 2; L < s.length; L++) {
    // 左边界为 i, 右边界为 j 那么 L = j - i + 1 => j = L + i -1
    for(let i = 0; i< s.length; i++) {
      let j = L + i - 1
      
    }
  }
}

console.log(longestPalindrome2('aa'))
