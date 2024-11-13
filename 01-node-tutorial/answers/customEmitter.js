const EventEmitter = require("events");

const emitter = new EventEmitter();

let count = 0;

const intervalId = setInterval(() => {
    count++;
    emitter.emit("timer", count);
}, 1000);


//emitter.on("timer", (count) => console.log(count)); 

emitter.on("timer", (count) => {
    console.log("Timer Event:", count);

    // Emit a status event every 3 counts
    if (count % 3 === 0) {
        emitter.emit("status", `Count is at a multiple of 3: ${count}`);
    } else if (count % 5 === 0) {
        emitter.emit("status", `5 is "Buzz".`);
    }
});

emitter.on("status", (message) => {
    console.log("Status Event:", message);

    // reset if count 6
    if (message.includes("6")) {
        emitter.emit("reset", "Resetting count after reaching 6");
    }
});

emitter.on("reset", (message) => {
    console.log("Reset Event:", message);
    count = 0; // Reset count
});

setTimeout(() => {
    clearInterval(intervalId);
}, 10000);