const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {

    username: {

      type: String,
      required:[true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true

    },

    //añadir nombre

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    bio: String,

    instrument: String,

    genre: String,

    location: String,

    picProfile: String, // cloudinary

    vidProfile : String, // cloudinary

    role: {

      type: String,
      enum:["user", "admin"],
      default: "user"

    },








  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
