require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const mongoogse = require("mongoose");

const MONGODB = process.env.MONGODB;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoogse
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection successful");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
