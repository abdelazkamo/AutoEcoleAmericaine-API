const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  user_id: String,
  payment_date: Date,
  amount: Number,
  payment_method: String,
  createdAt: String,
});

module.exports = model("Payment", paymentSchema);
