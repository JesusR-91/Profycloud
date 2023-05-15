//Global variables

const router = require('express').Router();
const User = require('../models/User.model');
const Class = require ('../models/Class.model');
const uploader = require('../middlewares/cloudinary.middleware.js');


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

router.post('/edit', uploader.single("image"), async (req, res, next) =>{
    try {
        const {email, password, firstName, lastName} = req.body;
        let profileImg = "";
        if (req.file === undefined) {
            profileImg = undefined;
        } else {
            profileImg = req.file.path
        }
        await User.findByIdAndUpdate (userActive, {email, password, firstName, lastName, image: profileImg});
        res.redirect('/user')
    } catch (error) {
        next(error);
    }
})



module.exports = router;