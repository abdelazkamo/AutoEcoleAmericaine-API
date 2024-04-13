const Review = require("../../models/Reviews");

module.exports = {
  Query: {
    async getReview(_, { ID }) {
      return await Review.findById(ID);
    },
    async getReviews(_, { amount }) {
      return await Review.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createReview(_, { input: { user_id, package_id, rating, comment } }) {
      const createReview = new Review({
        user_id,
        package_id,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });

      const res = await createReview.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteReview(_, { ID }) {
      const wasDeleted = (await Review.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async updateReview(_, { ID, input: { rating, comment } }) {
      try {
        const updateReview = await Review.findByIdAndUpdate(
          ID,
          {
            rating,
            comment,
          },
          { new: true, upsert: false }
        );

        if (!updateReview) {
          throw new Error("Review not found");
        }

        return updateReview;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Review");
      }
    },
  },
};
