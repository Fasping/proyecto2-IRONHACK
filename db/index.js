const mongoose = require("mongoose");
const chalk = require("chalk");

const MONGODB_URI = process.env.MONGODB_URI;

//Mongoose connect
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.bgBlue("Connected to Mongo"));
  } catch (err) {
    console.log(chalk.bgRed("Error:", err));
  }
};

connectToMongo();
