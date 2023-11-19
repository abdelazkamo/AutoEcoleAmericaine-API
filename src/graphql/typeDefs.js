const { gql } = require("apollo-server");

module.exports = gql`
  input AddressInput {
    street: String!
    city: String!
    state: String!
    zip_code: String
  }

  input ContactInput {
    email: String!
    phone: String
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zip_code: String
  }

  type Contact {
    email: String!
    phone: String
  }

  type User {
    _id: ID!
    name: String!
    password: String!
    avatar: String
    language: String
    green: Int
    address: [Address!]!
    contact: [Contact!]!
    createdAt: String
  }

  input UserInput {
    name: String!
    password: String!
    avatar: String
    address: [AddressInput!]!
    contact: [ContactInput!]!
  }
  input UserUpdateInput {
    name: String
    password: String
    avatar: String
    address: [AddressInput]
    contact: [ContactInput]
  }

  type Query {
    getUser(ID: ID): User!
    getUsers(amount: Int): [User]
  }

  type Mutation {
    createUser(input: UserInput): User!
    deleteUser(ID: ID!): Boolean
    updateUser(ID: ID!, input: UserUpdateInput): User!
  }
`;
