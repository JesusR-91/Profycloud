const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String,
    image: String,
    rol: [{
      type: String,
      enum: ['professor', 'tutor'],
      default: 'professor',
    }],
    admin: {
      type: Boolean,
      default: false,
    },
    class: [{
      type: Schema.Type.ObjectId,
      ref: 'Class',
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
