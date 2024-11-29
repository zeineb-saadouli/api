//models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creation d'un shema d'un user
const UserSchema = new Schema({
    fullName: {
      type: String,
      required: [true, "full name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    mobileNumber: {
      type: Number,
      required: [true, "mobile number is required"],
      min: [1000000000],
      max: [9999999999],
    },
    // birthdate: {
    //   type: Date,
    //   required: [true, "birthdate number is required"]
    // },
})
//creation du modele
const User= mongoose.model('User', UserSchema);
module.exports= User;