
/*
Test #1
Write a command-line program that prints out the sum of two non-negative integers as input arguments. You must not use any built-in BigInteger library or convert the inputs to integer directly.
*/

const args = process.argv.slice(2).map(x => x | 0)
const rst = args.reduce((a, b) => a + b);

//run test:  node test1.js 10 11
console.log(rst);