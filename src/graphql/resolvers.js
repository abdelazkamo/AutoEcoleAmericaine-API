const User = require("../models/Users");
const Ride = require("../models/Rides");

module.exports = {
  Query: {
    async getUser(_, { ID }) {
      return await User.findById(ID);
    },
    async getUsers(_, { amount }) {
      return await User.find().sort({ createdAt: -1 }).limit(amount);
    },

    async getRide(_, { ID }) {
      return await Ride.findById(ID);
    },
    async getRides(_, { amount }) {
      return await Ride.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createUser(
      _,
      { input: { name, password, avatar, address, contact } }
    ) {
      const createUser = new User({
        name,
        password,
        avatar,
        address,
        contact,
        language: null,
        green: 0,
        createdAt: new Date().toISOString(),
      });

      const res = await createUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteUser(_, { ID }) {
      const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async updateUser(
      _,
      { ID, input: { name, password, avatar, address, contact } }
    ) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          ID,
          {
            name,
            password,
            avatar,
            address,
            contact,
          },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
    },

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
          { new: true }
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
