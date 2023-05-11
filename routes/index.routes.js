const router = require('express').Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




const adminRouter = require('./admin.routes');
router.use('/admin', adminRouter);

const alumnRouter = require('./alumn.routes');
router.use('/alumn', alumnRouter);

const classesRouter = require('./classes.routes');
router.use('/class', classesRouter);

const userRouter = require('./user.routes');
router.use('/profile', userRouter);

module.exports = router;
