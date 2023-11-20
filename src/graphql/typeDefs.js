const { gql } = require("apollo-server");

module.exports = gql`
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

  type Ride {
    _id: ID!
    start_location: String!
    end_location: String!
    date: String!
    available_weight: Float!
    price_per_kg: Float!
    start_time: String!
    end_time: String!
    distance: Float
    travel_mode: String!
    user_id: String!
  }

  input RideInput {
    start_location: String
    end_location: String
    date: String
    available_weight: Float
    price_per_kg: Float
    start_time: String
    end_time: String
    distance: Float
    travel_mode: String
    user_id: ID!
  }

  type Query {
    getUser(ID: ID): User!
    getUsers(amount: Int): [User]
    getRide(ID: ID): Ride!
    getRides(amount: Int): [Ride]
  }

  type Mutation {
    createUser(input: UserInput): User!
    deleteUser(ID: ID!): Boolean
    updateUser(ID: ID!, input: UserUpdateInput): User!
    createRide(input: RideInput): Ride!
    deleteRide(ID: ID!): Boolean
    updateRide(ID: ID!, input: RideInput): Ride!
  }
`;
