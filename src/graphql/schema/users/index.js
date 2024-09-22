const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    password: String!
    email: String!
    phone: String!
    role: String!
    avatar: String
    isVerified: Boolean
    createdAt: String
  }

  input UserInput {
    name: String!
    password: String!
    email: String!
    phone: String!
    role: String!
    avatar: String
  }

  input UserUpdateInput {
    _id: ID!
    name: String
    email: String
    phone: String
    role: String
    avatar: String
  }
  input UserPasswordUpdateInput {
    _id: ID!
    password: String
  }
  input UserForgetPassInput {
    password: String!
    token: String!
  }

  input AuthInput {
    email: String
    password: String
  }
  input OldPasswordInput {
    _id: ID!
    oldPassword: String
  }

  type AuthData {
    user: User!
    token: String!
    tokenExpiration: Int!
  }

  type VerificationResponse {
    message: String
    success: Boolean
  }

  type Query {
    getUser(ID: ID!): User!
    login(input: AuthInput): AuthData!
    getUsers(amount: Int): [User]
    checkOldPassword(input: OldPasswordInput): Boolean!
  }

  type Mutation {
    createUser(input: UserInput): User!
    deleteUser(ID: ID!): Boolean
    updateUser(input: UserUpdateInput): User!
    forgetPassword(input: UserForgetPassInput): User!
    updateUserPassword(input: UserPasswordUpdateInput): User!
    verifyEmail(token: String!): VerificationResponse
    sendResetPasswordLink(email: String!): Boolean
  }
`;
