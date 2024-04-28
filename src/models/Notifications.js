const { Schema, model } = require("mongoose");

const notificationSchema = new Schema({
  user_id: String,
  notification_type: String,
  message: String,
  timestamp: String,
});

module.exports = model("Notification", notificationSchema);
