const Transaction = require("../../models/Transactions");

module.exports = {
  Query: {
    async getTransaction(_, { ID }) {
      return await Transaction.findById(ID);
    },
    async getTransactions(_, { amount }) {
      return await Transaction.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createTransaction(
      _,
      {
        input: {
          user_id,
          package_id,
          ride_id,
          transaction_date,
          transaction_status,
        },
      }
    ) {
      const createTransaction = new Transaction({
        user_id,
        package_id,
        ride_id,
        transaction_date,
        transaction_status,
        createdAt: new Date().toISOString(),
      });

      const res = await createTransaction.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteTransaction(_, { ID }) {
      const wasDeleted = (await Transaction.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateTransaction(_, { ID, input: { transaction_status } }) {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          ID,
          {
            transaction_status,
          },
          { new: true, upsert: false }
        );

        if (!updateTransaction) {
          throw new Error("Transaction not found");
        }

        return updateTransaction;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Transaction");
      }
    },
  },
};
