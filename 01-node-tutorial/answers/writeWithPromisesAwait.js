const { writeFile, readFile } = require("fs").promises;


const writer = async () => {
    try { await writeFile(
        './temporary/temp.txt',
        `\nOne \nTwo \nThree`,
        { flag: 'a' } //a - append to the end of a file, w will rewrite
        )
        console.log('Writing data to the file');
        } catch (err) {
            console.log("An error occurred: ", err)
        }
}

const reader  = async () => {
    try{
        const data = await readFile('./temporary/temp.txt', "utf-8");
        console.log(data)
    } catch (err) {
        console.log("An error occurred: ", err)
    }
}

const readWrite = async () => {
    try {
        await writer();
        await reader();
      } catch (err) {
        console.log("An error occurred during a call back functions: ", err);
      }
}

readWrite();