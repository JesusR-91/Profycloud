const router = require("express").Router();
const Alumn = require("../models/Alumn.model.js");

const uploader = require('../middlewares/cloudinary.middleware.js');
const User = require("../models/User.model.js");

const {isLoggedIn} = require('../middlewares/middlewares');

router.use(isLoggedIn);

//GET /alumn/create =>create Alumns
router.get("/create", async (req, res, next) => {
  try {
    res.render("alumn/create.hbs");
  } catch (error) {
    next(error);
  }
});

//POST /alumn/create
router.post("/create", async (req, res, next) => {
  try {
    const { firstName, lastName, image } = req.body;
    await Alumn.create({ firstName, lastName, image });
    res.redirect("/create");
  } catch (error) {
    next(error);
  }
});

//GET /alumn/:idAlumno/details
router.get("/:idAlumn/details", async(req, res, next) => {
  try {
    const foundUser = await User.findById(req.session.user._id).populate('tutorClass');
    const alumnDetails = await Alumn.findById(req.params.idAlumn);
    const {tutorClass} = foundUser;
    let isTutor = false;

    if (((tutorClass !== undefined) && (`${tutorClass.name} ${tutorClass.subName}`) === alumnDetails.class)){
      isTutor = true;
    } 
     
    res.render("alumn/profile.hbs", {alumnDetails, isTutor});

  } catch (error) {
    next(error)
  }

  
});

//GET /alumn/:idAlumn/edit
router.get("/:idAlumn/edit", async (req, res, next) => {
  try {
    const editAlumn = await Alumn.findById(req.params.idAlumn).populate(
      "class"
    );
    res.render("alumn/edit.hbs");
  } catch (error) {
    next(error);
  }
});

//POST /alumn/:idAlumn/edit
router.post("/:idAlumn/edit", async (req, res, next) => {
  try {
    const { firstName, lastName, image } = req.body;
    let profileImg = "";
    if (req.file === undefined) {
        profileImg = image;
    } else {
        profileImg = req.file.path
    }
    await Alumn.findByIdAndUpdate(req.params.idAlumn, {
      firstName,
      lastName,
      image: profileImg,
    });
    res.redirect("alumn/edit.hbs");
  } catch (error) {
    next(error);
  }
});

//POST "/alumn/:idAlumn/delete"
router.post(":idAlumn/delete", uploader.single("image"), async (req, res, next) => {
  try {
    Alumn.findByIdAndDelete(req.params.idAlumn);
    res.redirect("alumn/edit.hbs");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
