const Message = require("../../../models/Messages");

module.exports = {
  Query: {
    async getUserMessage(_, { userID }) {
      try {
        const messages = await Message.find({ userID });

        if (!messages.length) {
          throw new Error("No messages found for this user");
        }
        return messages;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching messages");
      }
    },
  },

  Mutation: {
    async sendMessage(_, { input: { userID, object, senderMsg } }) {
      try {
        const newMessage = new Message({
          userID,
          object,
          senderMsg: [{ msg: senderMsg, time: new Date().toISOString() }],
          responseMsg: [],
          createdAt: new Date().toISOString(),
        });

        const res = await newMessage.save();
        return res;
      } catch (error) {
        console.error(error);
        throw new Error("Error sending message");
      }
    },

    async deleteMessage(_, { ID }) {
      try {
        const wasDeleted = (await Message.deleteOne({ _id: ID })).deletedCount;
        if (!wasDeleted) {
          throw new Error("Message not found");
        }
        return !!wasDeleted;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting message");
      }
    },

    async userReplyMessage(_, { input: { _id, senderMsg } }) {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          _id,
          {
            $push: {
              senderMsg: { msg: senderMsg, time: new Date().toISOString() },
            }, // Push an object into senderMsg array
          },
          { new: true, upsert: false }
        );

        if (!updatedMessage) {
          throw new Error("Message not found");
        }

        return updatedMessage;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add user reply");
      }
    },

    async adminReplyMessage(_, { input: { _id, responseMsg } }) {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          _id,
          {
            $push: {
              responseMsg: { msg: responseMsg, time: new Date().toISOString() },
            }, // Push an object into responseMsg array
          },
          { new: true, upsert: false }
        );

        if (!updatedMessage) {
          throw new Error("Message not found");
        }

        return updatedMessage;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add admin reply");
      }
    },
  },
};
