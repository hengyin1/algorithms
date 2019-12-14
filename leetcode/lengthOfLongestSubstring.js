// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let child = {};
  let maxChild = 0;
  let _maxChild = 0;
  let index = 0;
  for (let i = 0; i < s.length; i++) {
      if (child[s[i]] || child[s[i]] === 0) {
         let childLength = i - index;
         if (childLength > maxChild) maxChild = childLength;
         if (child[s[i]] < index) {
              _maxChild = i -  index + 1;
         } else {
              _maxChild = i -  child[s[i]];
         }
         if (child[s[i]] >= index) index = child[s[i]] + 1;
      } else {
          _maxChild += 1;
      }

      child[s[i]] = i;
  }

  if (_maxChild > maxChild) maxChild = _maxChild;
  return maxChild;
};