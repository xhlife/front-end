/* 
  主要用于数组或者类数组数据
  例如： dom节点得遍历，
        又或者，一些级联数据得遍历
        [
          id: 0,
          parentId: null,
          children: [
            {
              id:10,
              parentId: 0,
              // 嵌套多层数据
              children: [...]
            }
          ]
        ]
*/

// 主要分为两种实现方式，一、递归， 二、非递归

// 对于算法,无非就是时间换空间，空间换时间

/* 
    两者得区别：
    深度优先采用的是堆栈的形式, 即先进后出
    广度优先则采用的是队列的形式, 即先进先出
*/

/** 
 * @description 深度优先遍历,递归实现（Depth-first-search）
 * @param {arr}  需要查询的数组
 * @param {attr} 根据哪个属性去查找  key
 * @param {value} 属性的值是什么   value
 */

const recursionDeepFirstSearch = function(arr,attr,value){
  const result=[];
  arr.forEach(child => {
    const deep = item => {
      if(item[attr] === value){
        result.push(item);
      }
      item.children && item.children.forEach( childInner => deep(childInner))
    }
    deep(child)
  });
  return result;
}

/**
 * @description 深度优先查询(非递归),（Depth-first-search）
 * @param {arr} 需要查询的数组
 * @param {attr} 根据哪个属性去查找  key
 * @param {value} 属性的值是什么   value
 */
const deepFirstSearch = function(arr,attr,value){
  let dataArr = [...arr];
  let result = [];
  while(dataArr.length){
    // 尾部删除，先进后出
    let temp = dataArr.pop();
    let children = temp.children;
    if(temp[attr] === value){
      result.push(temp)
    }
    if(children){
      for(let i = children.length-1; i >=0; i--) {
        dataArr.push(children[i])
      }
    }
  }
  return result
}

/**
 * @description 广度优先查询，递归实现（breadth-first traverse）
 * @param {arr} 需要查询的数组
 * @param {attr} 根据哪个属性去查找  key
 * @param {value} 属性的值是什么   value
 */
const recursionBreadthFirstSearch = function(arr,attr,value){
  //递归版本的BFS由于层级太深，会导致堆栈溢出：Maximum call stack size exceeded，
  // 除非不返回结果
}

/**
 * @description 广度优先查询（breadth-first traverse）
 * @param {arr} 需要查询的数组
 * @param {attr} 根据哪个属性去查找  key
 * @param {value} 属性的值是什么   value
 */
const breadthFirstSearch = function(arr,attr,value){
  let result = [];
  let dataArr = [...arr];
  while(dataArr.length > 0){
    // 头部删除，先进先出
    let temp = dataArr.shift()
    if(temp[attr] === value){
      result.push(temp)
    }
    temp.children && dataArr.push(...temp.children)
  }
  return result;
}


const data = [
  {
      name: 'a',
      children: [
          { name: 'b', children: [{ name: 'e' }] },
          { name: 'c', children: [{ name: 'f' }] },
          { name: 'd', children: [{ name: 'g' }] },
      ],
  },
  {
      name: 'a2',
      children: [
          { name: 'b2', children: [{ name: 'e2' }] },
          { name: 'c2', children: [{ name: 'f2' }] },
          { name: 'd2', children: [{ name: 'g2' }] },
      ],
  }
]

let res1 = recursionDeepFirstSearch(data,'name','b')
console.log(res1);
let res2 = deepFirstSearch(data,'name','b')
console.log(res2);

// let res3 = recursionBreadthFirstSearch(data,'name','b')
// console.log(res3);

let res4 = breadthFirstSearch(data,'name','b')
console.log(res4);