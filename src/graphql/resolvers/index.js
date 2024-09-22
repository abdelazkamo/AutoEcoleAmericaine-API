const usersResolver = require("./users");

const rootResolver = {
  Query: {
    ...usersResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
  },
};

module.exports = rootResolver;
