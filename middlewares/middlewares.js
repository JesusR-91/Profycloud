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

const adminLocals = (req, res, next) =>{
  if((req.session.user !== undefined) && (req.session.user.admin === true)){
    res.locals.isAdmin = true;
  } else {
    res.locals.isAdmin = false;
  }
  next();
}

module.exports = {isLoggedIn, updateLocals, isAdmin, adminLocals}
