const { Schema, model } = require("mongoose");

const reservationSchema = new Schema({
  user_id: String,
  ride_id: String,
  weight: Number,
  status: String,
  createdAt: String,
});

module.exports = model("Reservation", reservationSchema);
