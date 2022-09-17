function Node(data,left,right){
  this.data = data;
  this.right = right;
  this.left = left;
  this.show = show;
}
function show(){ // 显示保存在节点中的数据
  return this.data;
}

/**
 * @description 二叉查找树的描述
 */
function BST(){
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.postOrder = postOrder;
  this.preOrder = preOrder;
  this.remove = remove;
}
// 节点插入
function insert(data){
  let n = new Node(data,null,null);
  if(!this.root){
    this.root = n
  }else{
    let current = this.root;
    let parent;
    while(true){
      parent = current;
      if(data < current.data){ // 小于，往左边遍历
        current = current.left;
        if(!current){
          parent.left = n;
          break;
        }
      }else{
        current = current.right;
        if(!current){
          parent.right = n
          break;
        }
      }
    }
  }
}
// 中序遍历
function inOrder(node){
  if(node !== null){
    inOrder(node.left);
    console.log(node.show())
    inOrder(node.right);
  }
}
function preOrder(node){
  if(node !== null){
    console.log(node.show())
    preOrder(node.left)
    preOrder(node.right)
  }
}
function postOrder(node){
  if(node !== null){
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show());
  }
}

function remove(data){
  return removeNode(this.root,data)
}
function removeNode(node,data){
  if(node == null){
    return null
  }
  if(data === node.data){
    // 没有子节点
    if(node.left == null && node.right == null){
      return null
    }
    // 没有左节点
    if(node.left == null){
      return node.right
    }
    if(node.right == null){
      return node.left
    }
    // 存在两个子节点，
    let tempNode = getSmallest(node.right)
    node.data = tempNode.data;
    node.right = removeNode(node.right,tempNode.data);
    return node
  }else if(data < node.data){
    node.left = removeNode(node.left,data)
    return node
  }else{
    node.right = removeNode(node.right,data)
    return node
  }
}
let nums = new BST();
nums.insert(56);
nums.insert(22);
nums.insert(81);
nums.insert(77);
nums.insert(10);
nums.insert(30);
nums.insert(92);
// inOrder(nums.root);
// preOrder(nums.root)
postOrder(nums.root)