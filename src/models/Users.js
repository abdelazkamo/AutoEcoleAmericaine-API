const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  avatar: String,
  role: String,
  isVerified: Boolean,
  createdAt: String,
});

module.exports = model("User", userSchema);
