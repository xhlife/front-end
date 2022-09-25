function reverseBTTree(node) {
  if(!node) return
  const tmp = node.left
  node.left = node.right
  node.right = tmp
  reverseBTTree(node.left)
  reverseBTTree(node.right)
}