const classes = [
  { name: 1, subName: "A", alumns: [] },
  { name: 1, subName: "B", alumns: [] },
  { name: 2, subName: "A", alumns: [] },
  { name: 2, subName: "B", alumns: [] },
  { name: 3, subName: "A", alumns: [] },
  { name: 3, subName: "B", alumns: [] },
];

const mongoose = require("mongoose");
const User = require("../models/User.model");
const Class = require("../models/Class.model");
const Alumn = require("../models/Alumn.model");

require("../db/index");
const alumnsData = require("./alumn.json");

alumnsData.forEach((alumn) => {
  classes.forEach((clase) => {
    if (alumn.classroom === `${clase.name} ${clase.subName}`) {
      clase.alumns.push(alumn._id);
    }
  });
});

Class.insertMany(classes)
  .then(() => {
    console.log("Clases metidos en base de dato");
  })
  .catch((err) => console.log(err));
