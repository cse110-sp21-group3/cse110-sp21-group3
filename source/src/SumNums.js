function sumNums(input) {
    sum = 0;
    input.forEach(num => {
        sum += num
    });
    return sum;
}

module.exports = sumNums;