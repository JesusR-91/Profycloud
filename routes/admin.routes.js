const router = require("express").Router();
const User = require("../models/User.model");
const Class = require("../models/Class.model");
const uploader = require("../middlewares/cloudinary.middleware.js");

const { isAdmin } = require("../middlewares/middlewares");

router.use(isAdmin);

//GET /admin
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.render("admin/index", { allUsers });
  } catch (error) {
    next(error);
  }
});

//GET /admin/:idUser
router.get("/:idUser", async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.idUser).populate(
      "tutorClass"
    );
    const userClasses = await User.findById(req.params.idUser)
      .populate("class")
      .select({ class: 1 });
    res.render("admin/users", { oneUser, userClasses });
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
router.post(
  "/:idUser/edit",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      let profileImg = "";
      if (req.file === undefined) {
        profileImg = undefined;
      } else {
        profileImg = req.file.path;
      }
      console.log(req.body);
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
  }
);

//POST /admin/:idUser/delete
router.post("/:idUser/delete", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.idUser);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

//GET  /admin/class/class
router.get("/class/class", async (req, res, next) => {
  try {
    const allClasses = await Class.find();
    res.render("admin/classes-index.hbs", { allClasses });
  } catch (error) {
    next(error);
  }
});

//GET /admin/class/:idClass
 router.get("/class/:idClass", async (req, res, next) => {
  try {
    const oneClass = await Class.findById(req.params.idClass).populate(
      "alumns"
    );
    const professors = await User.find({ class: oneClass._id });
    res.render("admin/classes.hbs", { oneClass, professors });
  } catch (error) {
    next(error);
  }
}); 

//GET /admin/class/:idClass/edit
router.get("/class/:idClass/edit", async (req, res, next) => {
  try {
    const editClass = await Class.findById(req.params.idClass).populate(
      "alumns"
    );
    res.render("admin/classes-edit.hbs", {editClass});
  } catch (error) {
    next(error);
  }
});

//POST /admin/class/:idClass/edit
router.post("/class/:idClass/edit", async (req, res, next) => {
  try {
    const { name, subName} = req.body;
    await Class.findByIdAndUpdate(req.params.idClass, {name, subName});
    res.redirect("/admin/class/class");
  } catch (error) {
    next(error);
  }
});

// GET /admin/class/create/newClass
router.get("/class/create/newClass", async (req, res, next) => {
  try {
    res.render("admin/class-created.hbs");
  } catch (error) {
    next(error);
  }
});

// POST /admin/class/create/newClass
router.post("/class/create/newClass", async (req, res, next) => {
  try {
    const { name, subName } = req.body;
    console.log(name, subName)
   await Class.create({ name, subName });
    res.redirect("/admin/class/class"); 
  } catch (error) {
    next(error);
  }
});

//POST /admin/class/:idClass/delete
router.post("/class/:idClass/delete", async(req, res, next)=>{
  try {
    await Class.findByIdAndDelete(req.params.idUser)
    res.redirect("/admin/class")
  } catch (error) {
    next(error)
  }
})



module.exports = router;
