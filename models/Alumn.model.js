const { Schema, model } = require("mongoose");

const alumnSchema = new Schema({
  firstName: String,
  lastName: String,
  image: {
    type: String,
    default: "/images/logo.png",
  },
  classroom: String,
  contactEmail: String,
  contactPerson: String,
  contactPhone: Number,
});

const Alumn = model("Alumn", alumnSchema);

module.exports = Alumn;
