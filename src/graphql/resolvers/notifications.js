const Notification = require("../../models/Notifications");

module.exports = {
  Query: {
    async getNotification(_, { ID }) {
      return await Notification.findById(ID);
    },
    async getNotifications(_, { amount }) {
      return await Notification.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createNotification(
      _,
      { input: { user_id, notification_type, message } }
    ) {
      const createNotification = new Notification({
        user_id,
        notification_type,
        message,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

      const res = await createNotification.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteNotification(_, { ID }) {
      const wasDeleted = (await Notification.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateNotification(_, { ID, input: { notification_type, message } }) {
      try {
        const updateNotification = await Notification.findByIdAndUpdate(
          ID,
          {
            notification_type,
            message,
          },
          { new: true, upsert: false }
        );

        if (!updateNotification) {
          throw new Error("Notification not found");
        }

        return updateNotification;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Notification");
      }
    },
  },
};
