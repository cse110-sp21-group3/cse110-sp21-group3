function sumNums(input) {
  let sum = 0;
  input.forEach((num) => {
    sum += num;
  });
  return sum;
}

module.exports = sumNums;
