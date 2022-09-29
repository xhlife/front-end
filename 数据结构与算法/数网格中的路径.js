// 一个矩形网格中， 小虫子从A到B,只能沿着网格走， 每次只能向右或向下。
// 求有多少种走法？

// 递归思想 ，
//递归表达式

/** 
 *            f(x-1, y) + f(x, y - 1),  x>0, y > 0
 *            1,                        x=0, y = 0 
 * f(x, y) =  f(x-1, y)                 x>0, y=0
 *            f(x, y-1)                 x=0, y>0
*/

// x, y 代表终点， 默认 起点 0,0
function f(x,y) {
  if(x > 0  && y > 0) {
    return f(x-1, y) + f(x, y-1)
  } else if(x>0) {
    return f(x-1, y)
  } else if(y>0) {
    return f(x, y-1)
  } else {
    return 1
  }
}

// 缓存优化

function ff(x, y, dp = []) {
  if(!dp[y]) {  // x代表列， y代表行  dp 记录
    dp[y]= []
  }
  if(dp[y][x] !== undefined) {
    return dp[y][x]
  }
  if(x > 0 && y > 0) {
    dp[y][x] = f(x-1, y, dp) + f(x, y-1, dp)
  } else if(x > 0) {
    dp[y][x] = f(x-1, y, dp)
  } else if(y>0) {
    dp[y][x] = f(x, y-1)
  } else {
    dp[y][x] = 1
  }
  return dp[y][x]
}

// 动态规划-解法  从左往右，
/**
 * 比如 从 0,0到  4,0 ， 00 -》 00 只有1中， 00-》10 也是1种， 同理递推 00->其实只有一中
 *     从 0,0 到 1,4,  00 -> 11 有2种， 00-2,1 有3种（00->11 + 00,10）， 00-3，1有4种， 00-4,1有5种
 * 可以发现，前面计算的结果加和等于后面的
*/
// w其实就是x, h 就是y 
function fff(w, h) {
  const dp = []
  for(let y = 0; x <= h; x++) {
    dp[y] = []
    for(let x = 0; x <= w; x++) {
      if(x === 0 && y===0) {
        dp[y][x] = 1
      } else if(x === 0) {
        dp[y][x] = dp[y-1][x]
      } else if (y===0) {
        dp[y][x] = dp[y][x-1]
      } else {
        dp[y][x] = dp[y][x-1] + dp[y-1][x]
      }
    }
  }
  return dp[h][w]
}


// 排列组合 
/**
 * 相当于向右走4步（4个红球）和 向下走3步(3个白球)， 求全排列
 * A77 / A44*A33
*/



