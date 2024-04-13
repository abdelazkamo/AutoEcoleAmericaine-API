const Reservation = require("../../models/Reservations");

module.exports = {
  Query: {
    async getReservation(_, { ID }) {
      return await Reservation.findById(ID);
    },
    async getReservations(_, { amount }) {
      return await Reservation.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createReservation(_, { input: { user_id, ride_id, weight } }) {
      const createReservation = new Reservation({
        user_id,
        ride_id,
        weight,
        status: "Waiting",
        createdAt: new Date().toISOString(),
      });

      const res = await createReservation.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteReservation(_, { ID }) {
      const wasDeleted = (await Reservation.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateReservation(_, { ID, input: { weight, status } }) {
      try {
        const updateReservation = await Reservation.findByIdAndUpdate(
          ID,
          {
            weight,
            status,
          },
          { new: true, upsert: false }
        );

        if (!updateReservation) {
          throw new Error("Reservation not found");
        }

        return updateReservation;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update reservation");
      }
    },
  },
};
