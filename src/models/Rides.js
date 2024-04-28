const { Schema, model } = require("mongoose");

const rideSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  start_location: String,
  end_location: String,
  date: Date,
  available_weight: Number,
  price_per_kg: Number,
  start_time: String,
  end_time: String,
  distance: Number,
  travel_mode: String,
  createdAt: String,
});

module.exports = model("Ride", rideSchema);
