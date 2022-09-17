
// 通过快慢指针的方式
function isAround(head) {
  let fast = head;
  let slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if(fast === slow)  {
      // 如果快慢指针相遇，那么代表存在环
      return true
    }
  }
  return false
}

// 找到链表环的起点位置
function startOfArround(head) {
  let fast = head;
  let slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if(fast === slow)  {
      // 如果快慢指针相遇，那么代表存在环
      // return true
      // 此时，需要寻找到环开始点，就变成了数学的追赶问题
      // 假设 链表 3 > 2 > 0 > 4 > 2 （即4回到2）
      // 假设 3 > 2 的距离为 a, 相遇点为4, 2-4距离为 b, 4-2距离为c
      // fast的距离 为 a + n(b + c) + b , 其中n 为环的圈数， 因为环小的话，那么fast可能跑了好几圈了
      // slow的距离为 a + b, 为什么没有 n ，因为就算最大环（即4-3，fast也就跑一圈就相遇了,因为fast = 2slow）
      // 因此， a+(n+1)b+nc=2(a+b) ⟹ a=c+(n−1)(b+c)
      // 由公式可以看出，从两指针相遇点到入环点的距离加上 n−1 圈的环长，恰好等于从链表头部到入环点的距离。
      // 因此，当fast与slow相遇时，额外使用一个指针从head开始走，当head与slow指针相遇时，该位置就是环的起点。

      fast = head; // 快指针从头开始， 即 从3开始
      while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return slow
    }
  }
  return null
}