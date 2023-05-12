const { Schema, model } = require("mongoose");

const alumnSchema = new Schema ({
    firstName: String,
    lastName: String,
    image: String,
    class: String,
})

const Alumn = model('Alumn', alumnSchema);

module.exports = Alumn;