const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  // const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  status: String,
});

const Userdb = mongoose.model("userdb", schema);
// const Userdb = mongoose.model("Userdb", userSchema);
module.exports = Userdb;
