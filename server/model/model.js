const mongoose = require("mongoose");
// const validate = require("validator");
// const { default: isEmail } = require("validator/lib/isemail");

var schema = new mongoose.Schema({
  // const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
        unique:true,
        // required: 'Please enter your email',
        // trim: true,
        // lowercase:true,
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
  },
  gender: {
    type: String,
    uppercase: true,
  },
  status: {
    type: String,
    uppercase: true,
  },
  image:{
    data: Buffer,
    contentType: String
  }
});


const Userdb = mongoose.model("userdb", schema);
// const Userdb = mongoose.model("Userdb", userSchema);
module.exports = Userdb;
