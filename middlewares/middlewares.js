const express = require('express');


// const isProfOrTutor = (req, res, next, clase) => {
//     if (req.session.user.rol.includes('tutor') && req.session.user.tutorClass === `${clase.name} ${clase.subName}`){
//        const isTutor = true;  
//       next()
//     } else {

//         const isTutor = false;  
//         res.redirect('/');
//     }
// };

const isAdmin = (req, res, next) =>{
    if (req.session.user.admin === true) {
      next();
    } else {
      res.redirect('/');
    }
};


module.exports = {isAdmin}
