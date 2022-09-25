// /求从左边看向树， 求看到的轮廓值

// 解法- 递归  + 决策树

function leftoutlineTree(node, d = 0, outline = []) {
  if(!node) return
  
  if(!outline[d]) {
    outline[d] = node.left
  }
  leftoutlineTree(node.left, d++, outline)
  leftoutlineTree(node.right, d++, outline)
  return outline
}

// 求层的最大值

function maxOfLine(node, d = 0, outline = []) {
  if(!node) return

  outline[d] = Math.max(outline[d] || -1, node.value)

  maxOfLine(node.left, d + 1, outline)
  maxOfLine(node.right, d + 1, outline)
}