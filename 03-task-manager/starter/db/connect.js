const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, --- MongoDB 6+ createIndex method by default.
    //useFindAndModify: false, --- MongoDB 6+ findOneAndUpdate() method by default
  });
};

module.exports = connectDB;