/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const n = s.length;
  const states = Array(n);
  for (let i = 0; i < n; i++) {
    states[i] = Array(n);
    for (let j = 0; j < n; j++) {
      states[i][j] = -1;
    }
  }

  for (let j = 0; j < n - 1; j++) {
    if (s[j] === s[j + 1]) states[0][j] = j + 1;
    if (j + 2 < n && s[j] === s[j + 2]) states[0][j] = j + 2;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (states[i - 1][j] > -1) {
        const value = states[i - 1][j] + 1;
        if (j - 1 > -1 && value < n && s[j - 1] === s[value]) {
          states[i][j - 1] = value;
        }
      }
    }
  }

  for (let i = n - 1; 1 >= 0; i--) {
    let max = -1;
    let maxStr = '';
    for (let j = 0; j < n; j++) {
     if (states[i][j] > -1 && states[i][j] - j > max) {
       max = states[i][j] - j;
       maxStr = s.slice(j, states[i][j] + 1);
     }
    }
    if (maxStr) return maxStr;
  }
};

console.log(longestPalindrome('cbbd'))