const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Character = require("../models/Character.model");
const User = require("../models/User.model");

//My own middleware
const {isLoggedIn} = require("../middleware/route-gard")

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
  console.log(req.params.id);
  const axiosCall = await axios(
    `https://akabab.github.io/starwars-api/api/id/${req.params.id}.json`
  );


  const infoFromCharacter = axiosCall.data;
  console.log(axiosCall.data);

  const justCreatedCharacter = await Character.create(infoFromCharacter);

  await User.findByIdAndUpdate(
    req.session.loggedUser._id,
    { $push: { characters: justCreatedCharacter._id } },
    { new: true }
  );

  res.redirect("/favoritos");
 });

//Delete Fav
router.post("/delete/:id", async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id, { new: true });
    await User.findByIdAndUpdate(req.session.loggedUser._id, {
      $pull: { pics: req.params.id },
    });
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/favoritos`);
});

module.exports = router;
