function knapsack(weight, n, w) {
  const states = Array(n);
  for (let i = 0; i < n; i++) {
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
    if (states[n - 1][i] === true) return i;
  }
  return 0;
}

function knapsack2(weight, n, w) {
  const states = Array(w);

  states[0] = true;
  if (weight[0] <= w) states[weight[0]] = true;

  for (let i = 1; i < n; i++) {
    for (let j = w - weight[i]; j >= 0; j--) {
      if (states[j] === true) states[j + weight[i]] = true;
    }
  }

  for (let i = w; i >= 0; i--) {
    if (states[i] === true) return i;
  }
  return 0;
}

function knapsack3(weight, value, n, w) {
  const states = Array(n);
  for (let i = 0; i < n; i++) {
    states[i] = Array(w);
    for (let j = 0; j < w; j++) {
      states[i][j] = -1;
    }
  }

  states[0][0] = 0;
  if (weight[0] <= w) states[0][weight[0]] = value[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (states[i - 1][j] >= 0) states[i][j] = states[i - 1][j];
    }

    for (let j = 0; j <= w - weight[i]; j++) {
      if (states[i - 1][j] >= 0) {
        const v = states[i - 1][j] + value[i];
        if (v > states[i][j + weight[i]]) states[i][j + weight[i]] = v;
      }
    }
  }

  let maxvalue = -1;
  for (let i = w; i >= 0; i--) {
    if (states[n - 1][i] > maxvalue) maxvalue = states[n - 1][i];
  }
  return maxvalue;
}

console.log(knapsack2([2, 2, 4, 6, 3], 5, 9));
