const router = require("express").Router();
const Class = require("../models/Class.model.js");

//GET /class
router.get("/", async (req, res, next) => {
  try {
    const allClasses = await Class.find();
    res.render("classes/index.hbs", {
      allClasses: allClasses,
    });
  } catch (error) {
    next(error);
  }
});

//GET /class/:idClase
router.get("/:idClass", async (req, res, next) => {
  try {
    const oneClass = await Class.findById(req.params.idClase);
    res.render("classes/class.hbs", { oneClass: oneClass });
  } catch (error) {
    next(error);
  }
});

//POST /class/:idClase
router.post("/:idClass", async(req, res, next)=>{
    try {
        await Class.findByIdAndUpdate(req.params.idClase)
        res.redirect("/class")
    } catch (error) {
        next(error)
    }
})








module.exports = router;