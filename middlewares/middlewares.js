const express = require('express');


const isAdmin = (req, res, next) =>{
    if (req.session.user.admin === true) {
      next();
    } else {
      res.redirect('/');
    }
};


module.exports = {isAdmin}
