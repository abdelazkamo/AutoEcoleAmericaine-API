const User = require("../models/Users");
const Ride = require("../models/Rides");
const Reservation = require("../models/Reservations");
const Payement = require("../models/Payements");
const Transaction = require("../models/Transactions");
const Notification = require("../models/Notifications");

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

    async getReservation(_, { ID }) {
      return await Reservation.findById(ID);
    },
    async getReservations(_, { amount }) {
      return await Reservation.find().sort({ createdAt: -1 }).limit(amount);
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
    //----------------------Reservation-------------------------
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

    // -----------------Payement------------------------------
    async createPayement(
      _,
      { input: { user_id, payment_date, payment_method, amount } }
    ) {
      const createPayement = new Payement({
        user_id,
        payment_date,
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

    //-------------------------Transaction------------------------
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

    //-----------------Notification----------------------

    async createNotification(
      _,
      { input: { user_id, notification_type, message, timestamp } }
    ) {
      const createNotification = new Notification({
        user_id,
        notification_type,
        message,
        timestamp,
        createdAt: new Date().toISOString(),
      });

      const res = await createNotification.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteNotification(_, { ID }) {
      const wasDeleted = (await Notification.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateNotification(
      _,
      { ID, input: { notification_type, message, timestamp } }
    ) {
      try {
        const updateNotification = await Notification.findByIdAndUpdate(
          ID,
          {
            notification_type,
            message,
            timestamp,
          },
          { new: true, upsert: false }
        );

        if (!updateNotification) {
          throw new Error("Notification not found");
        }

        return updateNotification;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Notification");
      }
    },
    //-----------------Subscription----------------------

    async createSubscription(
      _,
      { input: { user_id, start_date, end_date, subscription_status } }
    ) {
      const createSubscription = new Subscription({
        user_id,
        start_date,
        end_date,
        subscription_status,
        createdAt: new Date().toISOString(),
      });

      const res = await createSubscription.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteSubscription(_, { ID }) {
      const wasDeleted = (await Subscription.deleteOne({ _id: ID }))
        .deletedCount;
      return wasDeleted;
    },

    async updateSubscription(
      _,
      { ID, input: { start_date, end_date, subscription_status } }
    ) {
      try {
        const updateSubscription = await Subscription.findByIdAndUpdate(
          ID,
          {
            start_date,
            end_date,
            subscription_status,
          },
          { new: true, upsert: false }
        );

        if (!updateSubscription) {
          throw new Error("Subscription not found");
        }

        return updateSubscription;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update Subscription");
      }
    },

    //-----------------Review----------------------

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
