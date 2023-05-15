const router = require("express").Router();
const User = require("../models/User.model");
const Class = require("../models/Class.model");
const uploader = require('../middlewares/cloudinary.middleware.js');

const { isAdmin } = require("../middlewares/middlewares");

//GET /admin
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.render("admin/index", {allUsers});
  } catch (error) {
    next(error);
  }
});

//GET /admin/:idUser
router.get("/:idUser", async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.idUser);
    res.render("admin/users", { oneUser });
  } catch (error) {
    next(error);
  }
});

//GET /admin/:idUser/edit
router.get("/:idUser/edit", async (req, res, next) => {
  try {
    const editUser = await User.findById(req.params.idUser).populate("class");
    res.render("admin/users-edit.hbs", editUser);
  } catch (error) {
    next(error);
  }
});

//POST /admin/:idUser/edit
router.post("/:idUser/edit",uploader.single("image"), async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    let profileImg = "";
    if (req.file === undefined) {
      profileImg = undefined;
    } else {
      profileImg = req.file.path;
    }
    console.log(req.body)
    await User.findByIdAndUpdate(req.params.idUser, {
      email,
      password,
      firstName,
      lastName,
      image: profileImg,
    });
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
