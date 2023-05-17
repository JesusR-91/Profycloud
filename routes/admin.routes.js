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
    const allClasses = await Class.find();
    res.render("admin/users-edit.hbs", {editUser, allClasses});
  } catch (error) {
    next(error);
  }
});

//POST /admin/:idUser/edit
router.post("/:idUser/edit", uploader.single("image"), async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, tutorClass, classes } = req.body;

      //cloudinary settings
      let profileImg = "";
      if (req.file === undefined) {
        profileImg = undefined;
      } else {
        profileImg = req.file.path;
      }

      const user = await User.findByIdAndUpdate(req.params.idUser, {email, password, firstName, lastName, image: profileImg, tutorClass, classes});
      
      //update de classes
      let classArray = [];
      if(typeof classes !== "object") {
        classArray.push(classes)
      } else {
        classes.forEach(clas => classArray.push(clas));
      }

      // pull the non-selected classes
      for (let i = 0; i < user.class.length; i++){
        if (classArray.includes(user.class[i]) === false){
          await User.findByIdAndUpdate(user._id, {$pull: {class: user.class[i]}});
        }  
      }

      // push the selected classes
      for(let j = 0; j < classArray.length; j++){
        if (user.class.includes (classArray[j]) === false){
          await User.findByIdAndUpdate(user._id, {$push: {class: classArray[j]}});
        }
      }
      
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

    //update de classes for the professors
    let profArray = [];
    if(typeof professors !== "object") {
      profArray.push(professors)
    } else {
      professors.forEach(professor => profArray.push(professor));
    }
    const editClass = await Class.findByIdAndUpdate(req.params.idClass, {name, subName});
    let allProfessors = await User.find();
    for (let i = 0; i < allProfessors.length; i++){
      if ((profArray.includes(allProfessors[i]._id.toString()) === true) && ((allProfessors[i].class.includes(editClass._id) === false))){
        console.log("añadiendo,", allProfessors[i]._id)
        await User.findByIdAndUpdate(allProfessors[i]._id, {$push: {class: editClass._id}});
      } else if ((allProfessors[i].class.includes(editClass._id) === true) && (profArray.includes(allProfessors[i]._id.toString()) ===false)){
        console.log("removiendo,", allProfessors[i]._id)
        await User.findByIdAndUpdate(allProfessors[i]._id, {$pull: {class: editClass._id}});
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
    await Class.findByIdAndDelete(req.params.idClass)
    res.redirect("/admin")
  } catch (error) {
    next(error)
  }
})



module.exports = router;
