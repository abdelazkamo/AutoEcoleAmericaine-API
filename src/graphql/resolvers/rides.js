const Ride = require("../../models/Rides");
const Users = require("../../models/Users");

module.exports = {
  Query: {
    async getRide(_, { ID }) {
      return await Ride.findById(ID).populate("user");
    },
    async getRides(_, { amount }) {
      return await Ride.find()
        .sort({ createdAt: -1 })
        .limit(amount)
        .populate("user");
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
      try {
        // Fetch the user from the database
        const user = await Users.findById(user_id);
        if (!user) {
          throw new Error("User not found");
        }

        // Create a new Ride object with the user
        const newRide = new Ride({
          start_location,
          end_location,
          available_weight,
          price_per_kg,
          start_time,
          date,
          end_time,
          distance,
          travel_mode,
          user: user, // Assign the user's ObjectId to the user field
          createdAt: new Date().toISOString(),
        });

        // Save the new ride to the database
        const res = await newRide.save();

        // Return the created ride
        return res;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create ride");
      }
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
