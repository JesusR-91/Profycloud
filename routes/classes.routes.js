const router = require("express").Router();
const Class = require("../models/Class.model.js");
const Alumn = require("../models/Alumn.model.js");
const User = require("../models/User.model.js");

//GET /class
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user);
    const userClass = user.class;
    const classes = await Class.find({_id: userClass}).populate('alumns');
    console.log(classes);
    // console.log(userClass[0]);
    res.render("classes/index.hbs", { classes});
  } catch (error) {
    next(error);
  }
});

//GET /class/:idClase
router.get("/:idClass", async (req, res, next) => {
  try {
    const oneClass = await Class.findById(req.params.idClase);
    const alumnsInClass = await Alumn.find({class: req.params.idClase});
    console.log(alumnsInClass)
    res.render("classes/class.hbs", { oneClass, alumnsInClass });
  } catch (error) {
    next(error);
  }
});

//POST /class/:idClase
router.post("/:idClass", async (req, res, next) => {
  try {
    await Class.findByIdAndUpdate(req.params.idClase);
    res.redirect("/class");
  } catch (error) {
    next(error);
  }
});

//GET '/class/new' => render the view



// POST '/class/new' => add new classes

module.exports = router;
