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
    const allClasses = await Class.find()
    res.render("admin/index", { allUsers, allClasses });
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
    const editClass = await Class.findById(req.params.idClass).populate("alumns");
    const allProfessors = await User.find();
    res.render("admin/classes-edit.hbs", {editClass, allProfessors});
  } catch (error) {
    next(error);
  }
});

//POST /admin/class/:idClass/edit
router.post("/class/:idClass/edit", async (req, res, next) => {
  try {
    const { name, subName, professors} = req.body;
    let profArray = [];
    if(typeof professors !== "object") {
      profArray.push(professors)
    } else {
      professors.forEach(professor => profArray.push(professor));
    }
    const editClass = await Class.findByIdAndUpdate(req.params.idClass, {name, subName});
    let allProfessors = await User.find();
    console.log(allProfessors, profArray, editClass)
    for (let i = 0; i < allProfessors.length; i++){
      for(let j = 0; j < profArray.length; j++){
        if((allProfessors[i].class.includes(editClass._id) === false) && (allProfessors[i]._id === profArray[j])){
          await User.findByIdAndUpdate(allProfessors[i]._id, {$push: {class: editClass._id}});
          break;
        } else if ((allProfessors[i].class.includes(editClass._id) === true) && (allProfessors[i]._id !== profArray[j])){
          await User.findByIdAndUpdate(allProfessors[i]._id, {$pull: {class: editClass._id}});
        }
      }
    }
    res.redirect(`/admin/class/${req.params.idClass}`);
  } catch (error) {
    next(error);
  }
});

// GET /admin/class/create/newClass
router.get("/class/create/newClass", async (req, res, next) => {
  try {
    const allProfessors = await User.find();
    console.log(allProfessors)
    res.render("admin/class-created.hbs", {allProfessors});
  } catch (error) {
    next(error);
  }
});

// POST /admin/class/create/newClass
router.post("/class/create/newClass", async (req, res, next) => {
  try {
    const { name, subName, professors } = req.body;
    console.log(name, subName, professors)
    const newClass = await Class.create({ name, subName });
    for (let i = 0; i < professors.length; i++){
      await User.findByIdAndUpdate(professors[i], {$push: {class: newClass._id}});
    }
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
