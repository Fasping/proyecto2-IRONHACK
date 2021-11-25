const router = require("express").Router();

const User = require("../models/User.model");

const {isLoggedIn , isLoggedOut} = require('../middleware/route-gard')

/* GET favs page */
router.get("/favoritos", isLoggedIn, async (req, res, next) => {
  const usuario = await User.findById(req.session.loggedUser._id).populate(
    "characters"
  );

  console.log(usuario);

  res.render("favoritos", {characters : usuario.characters});
});

module.exports = router;
