const router = require("express").Router();

//Models
const Alumn = require("../models/Alumn.model");
const Class = require("../models/Class.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

//Middlewares
const {isLoggedIn, updateLocals, adminLocals} = require("../middlewares/middlewares");

router.use(updateLocals, adminLocals);

/* GET home page */
const authRouter = require("./auth.routes");
router.use("/", authRouter);

router.use(isLoggedIn);

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id).populate(
      "tutorClass"
    );
    if ((user !== undefined) & (user.tutorClass !== undefined)) {
      const alumns = await Alumn.find({
        classroom: `${user.tutorClass.name} ${user.tutorClass.subName}`,
      });
      let allComments = await Comment.find({ madeTo: alumns }).populate(
        "madeBy"
      );
      let alumnsComments = await Comment.find({ madeTo: alumns })
        .populate("madeTo")
        .select({ madeTo: 1 });
      allComments = JSON.parse(JSON.stringify(allComments));
      alumnsComments.forEach((alumn) => {
        allComments.forEach((comment) => {
          if(comment.madeTo === alumn.madeTo._id){comment.madeTo = alumn.madeTo}
          console.log(comment)
          let newDate =comment.createdAt.toString().slice(0,10) + ' ' + comment.createdAt.toString().slice(11,16);
          comment.createdAt = newDate;
        });
      });
      res.render("index", { allComments });
    }
    res.render("index");
  } catch (error) {
    next(error);
  }
});

//POST '/' => for the finder

router.post("/", async (req, res, next) => {
  try {
    const { find } = req.body;
    // let regexLet = /^(?=.*[a-zA-Z])$/gm;

    if (find !== undefined && find.length <= 2 && find.length > 0) {
      const foundClass = await Class.findOne({
        $and: [{ name: find[0] }, { subName: find[1] }],
      });
      res.redirect(`/class/${foundClass._id}`);
    } else if (find !== undefined && find.length === 3) {
      const foundClass = await Class.findOne({
        $and: [{ name: find[0] }, { subName: find[2] }],
      });
      res.redirect(`/class/${foundClass._id}`);
    } else if (find !== undefined && find.length > 3) {
      let alumn = find.split(" ");
      if (alumn.length === 1) {
        res.redirect(`/alumn/find-list/${alumn[0]}`);
      } else {
        const foundAlumn = await Alumn.findOne({
          $and: [{ firstName: alumn[0] }, { lastName: alumn[1] }],
        });
        if (foundAlumn === null) {
          res.render("index.hbs", {
            errorMessage: "Alumn not found.",
          });
        } else {
          res.redirect(`/alumn/${foundAlumn._id}/details`);
        }
      }
    } else {
      res.render("index.hbs", {
        errorMessage: "More specific you need to be.",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
});

const adminRouter = require("./admin.routes");
router.use("/admin", adminRouter);

const alumnRouter = require("./alumn.routes");
router.use("/alumn", alumnRouter);

const classesRouter = require("./classes.routes");
router.use("/class", classesRouter);

const userRouter = require("./user.routes");
router.use("/user", userRouter);

module.exports = router;
