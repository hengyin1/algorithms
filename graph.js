function orderByWeight(input) {
  const numbers = input.split(' ');
  numbers.sort();
  console.log('numbers', numbers);
  
  const weights = numbers.map(number => {
    let weight = 0;
    number.split('').forEach(element => {
      weight += Number(element);
    });
    return weight;
  });
  console.log('weights', weights);

  for (let i = 0; i < weights.length; i++) {
    for (let j = i + 1; j < weights.length; j++) {
      if (weights[i] > weights[j]) {
        const _tem = weights[i];
        weights[i] = weights[j];
        weights[j] = _tem;
        const tem = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = tem;
      }
    }
  }

  const result= numbers.join(' ');
  console.log('result', result);
  
  return result
}


orderByWeight('65 56 74 9999 5678 4567 12034 012569')