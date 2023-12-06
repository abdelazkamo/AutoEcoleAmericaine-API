const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  user_id: String,
  package_id: String,
  ride_id: String,
  transaction_date: Date,
  transaction_status: String,
  createdAt: String,
});

module.exports = model("Transaction", transactionSchema);
