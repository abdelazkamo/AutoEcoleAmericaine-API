const { mergeTypeDefs } = require("@graphql-tools/merge");

const userTypeDefs = require("./users");
//const messageTypeDefs = require("./messages");

const typeDefs = mergeTypeDefs([userTypeDefs]);

module.exports = typeDefs;
