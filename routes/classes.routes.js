const router = require("express").Router();
const Class = require("../models/Class.model.js");
const Alumn = require("../models/Alumn.model.js");
const User = require("../models/User.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/middlewares");
const uploader = require("../middlewares/cloudinary.middleware.js");

router.use(isLoggedIn);

//GET /class
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user);
    const userClass = user.class;
    const classes = await Class.find({ _id: userClass }).populate("alumns");
    res.render("classes/index.hbs", { classes });
  } catch (error) {
    next(error);
  }
});

//GET /class/:idClase
router.get("/:idClass", async (req, res, next) => {
  try {
    const oneClass = await Class.findById(req.params.idClass).populate('alumns');
    const professors = await User.find({class: [oneClass._id]});
  
    console.log(professors)
    res.render("classes/class.hbs", { oneClass, professors });
  } catch (error) {
    next(error);
  }
});

//POST /class/:idClase
router.post("/:idClass", async (req, res, next) => {
  try {
    await Class.findByIdAndUpdate(req.params.idClass);
    res.redirect("/class");
  } catch (error) {
    next(error);
  }
});

//GET '/class/new' => render the view
router.get("/clase/new", isAdmin, async (req, res, next) => {
  try {
    const listUsers = await User.findById(req.params._id);
    const listAlumns = await Alumn.findById(req.params._id);
    res.render("classes/new-class.hbs", { listUsers, listAlumns });
  } catch (error) {
    next(error);
  }
});
// POST '/class/new' => add new classes
router.post("/clase/new", uploader.single("image"), async (req, res, next) => {
  try {
    const { name, subName, Subject, alumns } = req.body;
    await Class.create({ name, subName, Subject, alumns });
    res.redirect("/class");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
