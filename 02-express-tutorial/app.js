//console.log('Express Tutorial')
const express = require('express');
const app = express();
const logger = require("./middleware/logger.js");
app.use(logger);
const { products, people } = require("./data");
const port = 3000;

const { time } = require("console");
const authRouter = require("./routes/auth.js")
const peopleRouter = require("./routes/people.js");
const productRouter = require("./routes/products.js")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cookieParser());

// setup static 
app.use(express.static("./methods-public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routers
app.use("/", authRouter);
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productRouter)

// handle 404 error
app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1><a href="/">Go back to Home</a>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});