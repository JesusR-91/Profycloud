const router = require('express').Router();
const {isLoggedIn, updateLocals, adminLocals} = require('../middlewares/middlewares');

router.use(updateLocals, adminLocals);

/* GET home page */
const authRouter = require('./auth.routes');
router.use('/', authRouter);

router.use(isLoggedIn);

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
router.use('/user', userRouter);


module.exports = router;
