const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Character = require("../models/Character.model");
const User = require("../models/User.model");

router.get("/", async (req, res) => {
  try {
    const axiosCall = await axios(`https://akabab.github.io/starwars-api/api/all.json`);
    const charactersInfo = axiosCall.data; //esto es un array
    res.render("./characters.hbs", { charactersInfo });
  } catch (err) {
    console.log(chalk.bgRed(err));
  }
});

router.post("/create/:id", async (req, res) => {
  const axiosCall = await axios(
    `https://akabab.github.io/starwars-api/api/all.json`
  );

  const infoFromCharacter = axiosCall.data.data.results;

  const dataToUpload = {
    name: infoFromCharacter[0].name,
    description: infoFromCharacter[0].description,
    thumbnail:
      infoFromCharacter[0].thumbnail.path +
      "." +
      infoFromCharacter[0].thumbnail.extension,
    comic: [...infoFromCharacter[0].comics.items],
  };

  const justCreatedCharacter = await Character.create(dataToUpload);

  await User.findByIdAndUpdate(
    req.session.loggedUser._id,
    { $push: { characters: justCreatedCharacter._id } },
    { new: true }
  );

  res.redirect("/");
});

module.exports = router;
