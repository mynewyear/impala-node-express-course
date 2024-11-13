const { writeFile, readFile } = require("fs").promises;

const file = './temporary/temp.txt'


writeFile(file, `\nLine 1`, { flag: 'a' }) // line 1
    .then(() => {
        return writeFile(file, `\nLine 2`, { flag: 'a' }) // line 2
    })
    .then(() => {
        return writeFile(file, `\nLine 3`, { flag: 'a' }) // line 3
    })
    .then(() => {
        return readFile(file, "utf-8");
    })
    .then(data => {
        console.log('Data: ', data)
    })
    .catch((err) => {
        console.log("An error occurred: ", err)
    })