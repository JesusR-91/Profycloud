const { Schema, model } = require("mongoose");

const classSchema = new Schema({
    name: Number,
    subName: String,
    Subject: [String],
});

const Class = model('Class', classSchema);

module.exports = Class;

