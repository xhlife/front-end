// 给定连个栈，如果实现一个队列

class Queue{
  constructor() {
    this.s1 = []
    this.s2 = []
  }
  // 入队
  enqueue(value) {
    this.s1.push(value)
  }
  // 出队
  dequeue() {
    // 出队之前，判断 s2是否为空
    if(!this.s2.length) {
      while(this.s1.length > 0) {
        this.s2.push(this.s1.pop())
      }
    }
    return this.s2.pop()
  }
}