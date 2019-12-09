// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let isPlusOne = false;
  let l1copy = l1;
  let l2copy = l2;

  const getValue = () => {
      const value1 = l1copy.val;
      const value2 = l2copy && l2copy.val || 0;
      let totalValue = value1 + value2;
      if (isPlusOne) totalValue += 1;
      if (totalValue < 10) {
          isPlusOne = false;
      } else {
          totalValue -= 10;
          isPlusOne = true;
      }
      return totalValue;
  }

  while (l1copy.next) {
      l1copy.val = getValue();
      l1copy = l1copy.next;
      l2copy = l2copy && l2copy.next;
  }

  l1copy.val = getValue();
  l2copy = l2copy && l2copy.next;

  if (l2copy) {
      while (l2copy) {
          let value = l2copy.val;
          if (isPlusOne) value += 1;
          if (value < 10) {
              isPlusOne = false;
          } else {
              value -= 10;
              isPlusOne = true;
          }
          const tem = new ListNode(value);
          l1copy.next = tem;
          l1copy = tem;
          l2copy = l2copy.next;
      }
  }
  if (isPlusOne) l1copy.next = new ListNode(1);
  return l1;
};