const path = require('path'); // Import the path module

const { readFileSync, writeFileSync } = require('fs');

const filePath = path.join(__dirname, 'temporary', 'fileA.txt');
console.log('start');

writeFileSync(
  filePath,
  `\nLine1 \nLine2 \nLine3`,
  { flag: 'a' } //a - append to the end of a file, w will rewrite
)
const result = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(result);