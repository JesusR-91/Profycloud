const { Schema, model } = require("mongoose");

const classSchema = new Schema({
    name: Number,
    subName: String,
    alumns: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumn',
    }]
});

const Class = model('Class', classSchema);

module.exports = Class;

