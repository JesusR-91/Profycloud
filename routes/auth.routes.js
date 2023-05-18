const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");


//GET "/signup"
router.get("/signup", async (req, res, next) => {
  try {
    res.render("auth/signup");
  } catch (error) {
    next(error);
  }
});
//POST "/signup"
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, image } = req.body;
    const regexPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const foundEmail = await User.findOne({ email: email });
    
    //!Usuario y Passwords vacios
    if (email === "" || password === "") {
      res.render("auth/signup", {
        errorMessage: "You shall not pass!.",
      });
      return;
    }
    //! Patron Password
    if (regexPattern.test(password) === false) {
      res.render("auth/signup", {
        errorMessage:
          "The code of honour must be more intricate.",
      });
      return;
    }
    //! Usuario Existente
    if (foundEmail !== null) {
      res.render("auth/signup", {
        errorMessage: "Registered already email this is.",
      });
      return;
    }
    //!Encriptación contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashPass,
      firstName,
      lastName,
      image,
    });
    //!Redirect
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

//GET "/login"
router.get("/login", async (req, res, next) => {
  res.render("auth/login");
});

//POST "/login"
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    //!Usuario y Passwords vacios
    if (email === "" || password === "") {
      res.render("auth/login", {
        errorMessage: "Email and password required are.",
      });
      return;
    }
    //! Usuario Inexistente
    if (foundUser === null) {
      res.render("auth/login", {
        errorMessage: "I've no memory of this email.",
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    //!Encriptación contraseña
    if (isPasswordCorrect === false) {
      res.render("auth/login", {
        errorMessage: "Password invalid it's.",
      });
      return;
    }
    //!Creando Sesión
    req.session.user = foundUser;
    req.session.save(() => {
      //!Redirect
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});
//GET "/logout"
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (error) {next(error)}
});
module.exports = router;
