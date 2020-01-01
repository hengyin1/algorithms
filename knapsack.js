function knapsack(weight, n, w) {
  const states = Array(n);
  for (let i = 0; i < w + 1; i++) {
    states[i] = Array(w);
  }

  states[0][0] = true;
  if (weight[0] <= w) states[0][weight[0]] = true;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (states[i - 1][j] === true) states[i][j] = true;
    }

    for (let j = 0; j <= w - weight[i]; j++) {
      if (states[i - 1][j] === true) states[i][j + weight[i]] = true;
    }
  }

  for (let i = w; i >= 0; i--) {
    if (states[n - 1][i]) return i;
  }
  return 0;
}

console.log(knapsack([2, 2, 4, 6, 3], 5, 9));
