// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：

// 输入: "cbbd"
// 输出: "bb"


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(!s || s.length === 1) return s;
  const n = s.length;
  const states = Array(n);
  for (let i = 0; i < n; i++) {
    states[i] = Array(n);
    for (let j = 0; j < n; j++) {
      states[i][j] = -1;
    }
  }

  for (let j = 0; j < n - 1; j++) {
    if (s[j] === s[j + 1]) {
      states[0][j] = j + 1;
    } else if (j + 2 < n && s[j] === s[j + 2]) {
      states[0][j] = j + 2;
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (states[i - 1][j] > -1) {
        const value = states[i - 1][j] + 1;
        if ((value - j) % 2 === 1) {
          if (j - 1 > -1 && value < n && s[j - 1] === s[value]) states[i][j - 1] = value;
        } else {
          if (j - 1 > -1 && value < n && s[j - 1] === s[value]) {
            states[i][j - 1] = value;
          } else if (j - 1 > -1 && value >= n && s[j - 1] === s[value - 1]) {
            states[i][j - 1] = value - 1;
          } else if (j - 1 < 0 && value < n && s[j] === s[value]) {
            states[i][j] = value;
          }
        }
      }
    }
  }

  let max = -1;
  let maxStr = '';
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
     if (states[i][j] > -1 && states[i][j] - j > max) {
       max = states[i][j] - j;
       maxStr = s.slice(j, states[i][j] + 1);
     }
    }
    if (maxStr) return maxStr;
  }
  return s[0];
};

console.log(longestPalindrome("aba"))