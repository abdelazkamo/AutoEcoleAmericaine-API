const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  user_id: String,
  start_date: Date,
  end_date: Date,
  subscription_status: String,
  type: String,
});

module.exports = model("Subscription", subscriptionSchema);
