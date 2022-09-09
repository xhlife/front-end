// LRU 缓存算法，是一个非常经典的算法
// LRU 英文全称, Least Recently Used 英译: 最近最少使用

// 页面置换算法中的一种，百度百科解析如下

/** 
 * LRU 是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。
 * 该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，
 * 当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。
*/

// LRU算法使用的场景非常多，这里简单举几个例子即可
/**
 * 1. 操作系统底层内存管理，其中包括有LRU算法
 * 2. 缓存服务， 比如 redis 等等
 * 3. 浏览器的最近浏览记录存储
*/

// LRU实现思路 
/**
 * 1、一块有限的内存空间
 * 2、空间存储的数据是要有序的，因为必须要顺序来删除数据，所以考虑 Array、 Map 数据结构，不能使用object，因为是无序的
 * 3、可以删除或者添加以及获取空间中的指定数据
 * 4、空间满了之后，在添加数据时，自动删除最久远的那条数据
*/

class LRUCache {
  private length:number
  private data: Map<string,unknown>
  constructor(length:number) {
    this.length = length
    this.data = new Map()
  }
  set(key:string, value:unknown) {
    const data = this.data
    if(data.has(key)) { // 如果存在，那么先删除再更新
      data.delete(key)
    }
    data.set(key, value)
    // 如果超出了容量， 则需要删除最久的数据
    if (data.size > this.length) {
      // 带Iterator接口的数据结构， 调用keys()函数将返回 一个 迭代器
      // 因为 每次 set之前, get之后，都会delete，然后更新， 因此 keys().next().value 就是最久没有用到的
      const delKey = data.keys().next().value
      data.delete(delKey)
    }
  }
  get(key:string) {
    const data = this.data
    // 未找到
    if (!data.has(key)) {
      return null
    }
    const value = data.get(key) 
    data.delete(key) // 先删除
    data.set(key, value) // 再更新，保证是最后set的（即保证是最后一项）
    return value
  }
}
// 限制长度为 5
const lruCache = new LRUCache(5);

// 先设置5个数据
lruCache.set('name', '登登登登');
lruCache.set('age', 22);
lruCache.set('sex', '男');
lruCache.set('height', 176);
lruCache.set('weight', '100');
console.log(lruCache);

// 测试 超出 map 长度范围 以及测试 set
lruCache.set('grade', '10000');
console.log(lruCache);

// 测试get
lruCache.get('sex');
console.log(lruCache);
