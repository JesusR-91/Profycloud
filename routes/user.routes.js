const router = require('express').Router();
const User = require('../models/User.model');
const Class = require ('../models/Class.model')

const {isProfOrTutor} = require('../middlewares/middlewares');


//Global variables


//GET  '/' => render the view

router.get ('/', async (req, res, next) =>{
    try {
        const userActive = req.session.user._id;
        const user = await User.findById(userActive).populate('class');
        res.render('user/profile.hbs', user);

    } catch (error) { next(error)}
})

//GET '//:idProfesor/edit' => render the view

router.get ('/edit', async (req, res, next) =>{
    try {
        const userActive = req.session.user._id;
        const user = await User.findById(userActive).populate('class')
        res.render('user/edit.hbs', user);
    } catch (error) { next(error)}
})

//POST '/:idProfesor/edit' => edit the info













module.exports = router;