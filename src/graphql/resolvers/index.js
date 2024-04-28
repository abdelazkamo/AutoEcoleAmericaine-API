const usersResolver = require("./users");
const notificationsResolver = require("./notifications");
const paymentResolver = require("./payments");
const reservationResolver = require("./reservations");
const reviewResolver = require("./reviews");
const ridesResolver = require("./rides");
const subscriptionResolver = require("./subscriptions");
const transactionResolver = require("./transactions");

const rootResolver = {
  Query: {
    ...usersResolver.Query,
    ...notificationsResolver.Query,
    ...paymentResolver.Query,
    ...reservationResolver.Query,
    ...reviewResolver.Query,
    ...ridesResolver.Query,
    ...subscriptionResolver.Query,
    ...transactionResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...notificationsResolver.Mutation,
    ...paymentResolver.Mutation,
    ...reservationResolver.Mutation,
    ...reviewResolver.Mutation,
    ...ridesResolver.Mutation,
    ...subscriptionResolver.Mutation,
    ...transactionResolver.Mutation,
  },
};

module.exports = rootResolver;
