const { Schema, model } = require("mongoose");

const rideSchema = new Schema({
  user_id: String,
  start_location: String,
  end_location: String,
  date: Date,
  available_weight: Number,
  price_per_kg: Number,
  start_time: Date,
  end_time: Date,
  distance: Number,
  travel_mode: String,
  createdAt: String,
});

module.exports = model("Ride", rideSchema);
