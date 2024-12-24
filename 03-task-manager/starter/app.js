const express = require("express");
const app = express();

const tasks = require("./routes/tasks");
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// get all tasks
app.use("/api/v1/tasks", tasks);
// create new task
app.post("/api/v1/tasks", tasks); 
// update task
app.get("/api/v1/tasks/:id", (req, res) => {});


const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};


start();
