const Subscription = require("../../models/Subscriptions");

module.exports = {
  Query: {
    async getSubscription(_, { ID }) {
      return await Subscription.findById(ID);
    },
    async getSubscriptions(_, { amount }) {
      return await Subscription.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createSubscription(
      _,
      { input: { user_id, start_date, end_date, type, subscription_status } }
    ) {
      const createSubscription = new Subscription({
        user_id,
        start_date,
        end_date,
        type,
        subscription_status,
        createdAt: new Date().toISOString(),
      });

      const res = await createSubscription.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteSubscription(_, { ID }) {
      const wasDeleted = (await Subscription.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateSubscription(
      _,
      { ID, input: { start_date, end_date, type, subscription_status } }
    ) {
      try {
        const updateSubscription = await Subscription.findByIdAndUpdate(
          ID,
          {
            start_date,
            end_date,
            type,
            subscription_status,
          },
          { new: true, upsert: false }
        );

        if (!updateSubscription) {
          throw new Error("Subscription not found");
        }

        return updateSubscription;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Subscription");
      }
    },
  },
};
