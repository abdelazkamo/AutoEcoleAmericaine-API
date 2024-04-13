const Ride = require("../../models/Rides");

module.exports = {
  Query: {
    async getRide(_, { ID }) {
      return await Ride.findById(ID);
    },
    async getRides(_, { amount }) {
      return await Ride.find().sort({ createdAt: -1 }).limit(amount);
    },
  },

  Mutation: {
    async createRide(
      _,
      {
        input: {
          start_location,
          end_location,
          available_weight,
          price_per_kg,
          start_time,
          date,
          end_time,
          distance,
          travel_mode,
          user_id,
        },
      }
    ) {
      const createRide = new Ride({
        start_location,
        end_location,
        available_weight,
        price_per_kg,
        start_time,
        date,
        end_time,
        distance,
        travel_mode,
        user_id,
        createdAt: new Date().toISOString(),
      });

      const res = await createRide.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteRide(_, { ID }) {
      const wasDeleted = (await Ride.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async updateRide(
      _,
      {
        ID,
        input: {
          start_location,
          end_location,
          available_weight,
          price_per_kg,
          start_time,
          date,
          end_time,
          distance,
          travel_mode,
        },
      }
    ) {
      try {
        const updatedRide = await Ride.findByIdAndUpdate(
          ID,
          {
            start_location,
            end_location,
            available_weight,
            price_per_kg,
            start_time,
            date,
            end_time,
            distance,
            travel_mode,
          },
          { new: true, upsert: false }
        );

        if (!updatedRide) {
          throw new Error("Ride not found");
        }

        return updatedRide;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update ride");
      }
    },
  },
};
