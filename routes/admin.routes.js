const router = require('express').Router();
const User = require('../models/User.model');
const Class = require ('../models/Class.model')

const {isAdmin} = require('../middlewares/middlewares');

//GET /admin
router.get("/", isAdmin, async (req, res, next) => {
    try {
      const allUsers = await User.find();
      res.render("admin/users.hbs", { allUsers: allUsers });
    } catch (error) {
      next(error);
    }
  });
  
  //GET /admin/:idUser
  router.get("/:idUser", isAdmin, async (req, res, next) => {
    try {
      const oneUser = await User.findById(req.params.idUser);
      res.render("admin/users-edit.hbs", { oneUser: oneUser });
    } catch (error) {
      next(error);
    }
  });
  
  //POST /admin/:idUser
  router.post("/:idUser", isAdmin, async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.params.idUser);
      res.render("admin/users-edit.hbs");
    } catch (error) {
      next(error);
    }
  });

module.exports = router;