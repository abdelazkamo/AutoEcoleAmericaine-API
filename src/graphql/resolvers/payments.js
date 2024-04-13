const Payement = require("../../models/Payments");

module.exports = {
  Query: {
    async getPayement(_, { ID }) {
      return await Payement.findById(ID);
    },
    async getPayements(_, { amount }) {
      return await Payement.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createPayement(_, { input: { user_id, payment_method, amount } }) {
      const createPayement = new Payement({
        user_id,
        payment_date: new Date().toISOString(),
        payment_method,
        amount,
        createdAt: new Date().toISOString(),
      });

      const res = await createPayement.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
