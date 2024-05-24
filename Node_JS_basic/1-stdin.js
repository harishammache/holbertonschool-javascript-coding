const readline = require('readline');

const readInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?');

readInput.on('line', (input) => {
  console.log(`Your name is: ${input}`);
  console.log('This important software is now closing');
  readInput.close();
});

module.exports = { readInput };
