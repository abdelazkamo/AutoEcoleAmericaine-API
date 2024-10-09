const { Schema, model } = require("mongoose");

const messsageSchema = new Schema({
  userID: String,
  object: String,
  senderMsg: [
    {
      msg: String,
      time: String,
    },
  ],
  responseMsg: [
    {
      msg: String,
      time: String,
    },
  ],
  createdAt: String,
});

module.exports = model("Message", messsageSchema);
