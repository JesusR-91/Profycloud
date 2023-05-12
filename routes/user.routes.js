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

//GET '/edit' => render the view

router.get ('/edit', async (req, res, next) =>{
    try {
        const userActive = req.session.user._id;
        const user = await User.findById(userActive).populate('class')
        res.render('user/edit.hbs', user);
    } catch (error) { next(error)}
})

//POST '/edit' => edit the info

router.post('/edit', async (req, res, next) =>{
    try {
        const {email, password, firstName, lastName, image} = req.body;
        const userActive = req.session.user._id;
        await User.findByIdAndUpdate (userActive, {email, password, firstName, lastName, image});
    } catch (error) {
        next(error);
    }
})



module.exports = router;