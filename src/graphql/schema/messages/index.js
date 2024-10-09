const { gql } = require("apollo-server");

module.exports = gql`
  type Message {
    _id: ID!
    userID: String!
    object: String!
    senderMsg: [MessageResponse!]!
    responseMsg: [MessageResponse!]!
    createdAt: String!
  }

  type MessageResponse {
    msg: String!
    time: String!
  }

  input MessageInput {
    userID: String!
    object: String!
    senderMsg: String!
    responseMsg: String
  }

  input UserReplyMessageInput {
    _id: ID!
    senderMsg: String
  }

  input AdminReplyMessageInput {
    _id: ID!
    responseMsg: String
  }

  input MessageResponseInput {
    msg: String!
    time: String!
  }

  type Query {
    getUserMessage(userID: ID!): [Message!]!
  }

  type Mutation {
    sendMessage(input: MessageInput): Message!
    deleteMessage(ID: ID!): Boolean!
    userReplyMessage(input: UserReplyMessageInput): Message!
    adminReplyMessage(input: AdminReplyMessageInput): Message!
  }
`;
