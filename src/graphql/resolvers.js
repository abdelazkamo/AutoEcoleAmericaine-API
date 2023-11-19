const User = require("../models/Users");

module.exports = {
  Query: {
    async getUser(_, { ID }) {
      return await User.findById(ID);
    },
    async getUsers(_, { amount }) {
      return await User.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createUser(
      _,
      { input: { name, password, avatar, address, contact } }
    ) {
      const createUser = new User({
        name: name,
        password: password,
        avatar: avatar,
        address: address,
        contact: contact,
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
        // Handle errors, log them, or throw a custom error if needed
        console.error(error);
        throw new Error("Failed to update user");
      }
    },
  },
};
