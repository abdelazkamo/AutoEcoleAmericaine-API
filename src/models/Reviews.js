const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  user_id: String,
  package_id: String,
  rating: Number,
  comment: String,
});

module.exports = model("Review", reviewSchema);
