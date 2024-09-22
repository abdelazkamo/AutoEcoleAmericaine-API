const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../../../models/Users");
const sendVerificationEmail = require("../../utils/sendEmailVerification");

module.exports = {
  Query: {
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }
      // Check if user is verified
      if (!user.isVerified) {
        throw new Error("User email is not verified. Please check your email.");
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

      user.token = token;
      await user.save();
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

    async checkOldPassword(_, { input: { _id, oldPassword } }) {
      try {
        // Fetch the user by ID
        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User not found");
        }
        // Check if the old password matches
        const isEqual = await bcrypt.compare(oldPassword, user.password);
        if (!isEqual) {
          throw new Error("Old password is incorrect!");
        }
        return isEqual;
      } catch (error) {
        throw new Error("Failed to verify old password");
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
      { input: { name, password, avatar, email, role, phone } }
    ) {
      const existingUserEmail = await User.findOne({ email: email });
      const existingUserPhone = await User.findOne({ phone: phone });

      if (existingUserEmail) {
        throw new Error("Email already used.");
      }
      if (existingUserPhone) {
        throw new Error("Phone number already used.");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const verificationToken = jwt.sign({ email }, SECRET_KEY, {
        expiresIn: "1d",
      });

      const createUser = new User({
        name,
        password: hashedPassword,
        avatar,
        email,
        role,
        phone,
        isVerified: false,
        createdAt: new Date().toISOString(),
      });
      const res = await createUser.save();

      // Send the verification email
      await sendVerificationEmail(
        email,
        verificationToken,
        process.env.VERIFY_EMAIL_URL
      );

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async sendResetPasswordLink(_, { email }) {
      const existingUserEmail = await User.findOne({ email: email });

      if (!existingUserEmail) {
        throw new Error("Account not found");
      }

      const resetToken = jwt.sign({ email }, SECRET_KEY, {
        expiresIn: "1d",
      });

      // Send the reset password email
      await sendVerificationEmail(
        email,
        resetToken,
        process.env.RESET_PASSWORD_URL
      );

      return true;
    },

    async deleteUser(_, { ID }) {
      const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async updateUser(_, { input: { _id, name, avatar, email, role, phone } }) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            name,
            avatar,
            email,
            role,
            phone,
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

    // To use on the dashboard app for confirming user after the link has been clicked on mail
    async verifyEmail(_, { token }) {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);

        const user = await User.findOne({
          email: decodedToken.email,
          //verificationToken: token,
        });

        if (!user) {
          throw new Error("Invalid or expired token");
        }

        // Update the user to mark as verified
        user.isVerified = true;
        //user.verificationToken = null;
        await user.save();

        return { message: "Email verified successfully" };
      } catch (error) {
        throw new Error("Failed to verify email");
      }
    },

    // To use on a page on the dashboard app for reseting user password after the link has been clicked on mail
    async forgetPassword(_, { input: { password, token } }) {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({
          email: decodedToken.email,
        });

        if (!user) {
          throw new Error("Invalid or expired token");
        }

        // Update the user password
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            password: hashedPassword,
            isVerified: true, // Turn is verify to true at the same time if it was false
          },
          { new: true, upsert: false }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to reset password");
      }
    },

    async updateUserPassword(_, { input: { _id, password } }) {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            password: hashedPassword,
          },
          { new: true, upsert: false }
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update password");
      }
    },
  },
};
