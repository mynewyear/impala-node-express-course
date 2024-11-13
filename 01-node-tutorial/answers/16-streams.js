const { createReadStream } = require("fs");

const stream = createReadStream('../content/big.txt', {
    highWaterMark: 200,
    encoding: "utf8"
});

let count = 0;

stream.on("data", (result) => {
    count++;
    console.log(result);
});

stream.on("end", () => {
    console.log(`Total is ${count} chunks of data.`);
});
stream.on('error', (err) => console.log("An error occurred:", err))