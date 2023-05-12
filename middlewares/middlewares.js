const cloudinary = require('cloudinary').v2;
const express = require('express');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// const storage = new CloudinaryStorage({
//   // cloudinary: cloudinary,
//   cloudinary,
//   params: {
//     allowed_formats: ['jpg', 'png'],
//     folder: 'profycloud' // The name of the folder in cloudinary
//     // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
//   }
// });
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
// multer({ storage });