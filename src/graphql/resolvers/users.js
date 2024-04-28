const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const User = require("../../models/Users");

module.exports = {
  Query: {
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ "contact.email": email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return { user: user, token: token, tokenExpiration: 1 };
    },

    async getUser(_, { ID }) {
      try {
        const user = await User.findById(ID);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },

    async getUsers(_, { amount }) {
      try {
        const users = await User.find().sort({ createdAt: -1 }).limit(amount);
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users");
      }
    },
  },

  Mutation: {
    async createUser(
      _,
      { input: { name, password, avatar, address, contact } }
    ) {
      const existingUser = await User.findOne({
        "contact.email": contact[0].email,
      });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const createUser = new User({
        name,
        password: hashedPassword,
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
          { new: true, upsert: false }
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
  },
};
