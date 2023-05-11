const isProfOrTutor = (req, res, next) =>{
    if (req.locals.user.rol.includes('tutor')){
        next()
    } else {
        res.redirect('/');
    }
};

const isAdmin = (req, res, next) =>{
    if (req.locals.user.admin) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {isProfOrTutor, isAdmin};