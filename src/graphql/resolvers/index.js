const usersResolver = require("./users");
const messageResolver = require("./messages");

const rootResolver = {
  Query: {
    ...usersResolver.Query,
    ...messageResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...messageResolver.Mutation,
  },
};

module.exports = rootResolver;
