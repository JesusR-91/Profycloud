const { Schema, model } = require("mongoose");

const commentSchema = new Schema ({
    comment: String,
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    madeTo: {
        type: Schema.Types.ObjectId,
        ref: 'Alumn',

    },
},
{ 
    timestamps: true
}
)

const Comment = model('Alumn', commentSchema);

module.exports = Comment;