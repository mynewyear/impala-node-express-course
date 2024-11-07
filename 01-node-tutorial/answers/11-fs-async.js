const path = require('path'); 

const { writeFile, readFileSync } = require('fs');
const file = path.join(__dirname, 'temporary', 'fileB.txt'); //file path

console.log('start');

writeFile(file, 'This is line 1\n', { flag: 'a' }, (err, result) => {
  console.log("at point 1");

  if (err) {
    console.log('This error happened:', err);
    return;
  } else {

    writeFile(file, 'This is line 2\n', { flag: 'a' }, (err, result) => {
      console.log("at point 2");

      if (err) {
        console.log('This error happened:', err);
      } else {

        writeFile(file, 'This is line 3\n', { flag: 'a' }, (err, result) => {
          console.log("at point 3");
          if (err) {
            console.log('This error happened:', err);
          }
        })
      }
    })
  }
})

console.log("at end");