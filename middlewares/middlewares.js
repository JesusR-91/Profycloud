const isAdmin = (req, res, next) =>{
    if (req.session.user.admin === true) {
      next();
    } else {
      res.redirect('/');
    }
};

const isLoggedIn = (req, res, next) =>{
  if(req.session.user === undefined) {
      //el usuario no tiene sesión activa
      res.redirect('/login');
  } else {
      next();
  }

}

const updateLocals = (req, res, next) =>{
  if(req.session.user === undefined){
      res.locals.isUserActive = false;
  } else {
      res.locals.isUserActive = true;
  }
  next();
}

module.exports = {isLoggedIn, updateLocals, isAdmin}
