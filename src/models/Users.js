const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  password: String,
  avatar: String,
  language: String,
  green: Number,
  address: Array,
  contact: Array,
  createdAt: String,
});

module.exports = model("User", userSchema);
