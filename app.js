//Middleware for .env
require("dotenv/config");

//Import Mongo connection
require("./db/index.js");

//Variables
const express = require("express");
const app = express();
const chalk = require("chalk");
const PORT = process.env.PORT || 5000;
const hbs = require("hbs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Middleware de hbs
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//Middleware de body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Middleware para archivos estaticos
app.use(express.static(__dirname + "/public"));

//Middleware de sessions
require("./config/session.config")(app);

// 👇 Start handling routes here
app.use("/", require("./routes/home.js"));
app.use("/", require("./routes/auth.js"));
app.use("/characters", require("./routes/characters.js"));

//App listener
app.listen(PORT, () => {
  console.log(chalk.bgGreen(`Server running in port ${PORT}`));
});



//Para ver los 50 primeros:

// https://gateway.marvel.com/v1/public/characters?limit=50&ts=1&apikey=aa5dfbaab3bbc9e17daea843dbae6d47&hash=3129c97e301afe65b334353cfcfe28d6

// offset=10 --> saltate los primeros 10 heroes
// limit=20 --> muestrame solo 20 heroes
