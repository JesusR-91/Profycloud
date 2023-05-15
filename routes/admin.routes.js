const router = require("express").Router();
const User = require("../models/User.model");
const Class = require("../models/Class.model");

const { isAdmin } = require("../middlewares/middlewares");

//GET /admin
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.render("admin/index", { allUsers: allUsers });
  } catch (error) {
    next(error);
  }
});

//GET /admin/:idUser
router.get("/:idUser", async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.idUser).populate("class");
    res.render("admin/users", { oneUser: oneUser });
  } catch (error) {
    next(error);
  }
});


//GET /admin/:idUser/edit


//POST /admin/:idUser/edit
router.post("/:idUser/edit", async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.idUser);
    res.render("admin/users-edit.hbs");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
