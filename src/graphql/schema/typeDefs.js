const { gql } = require("apollo-server");

module.exports = gql`
  type Address {
    street: String!
    city: String!
    state: String
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
    user: User!
  }

  input RideInputCreate {
    start_location: String!
    end_location: String!
    date: String!
    available_weight: Float!
    price_per_kg: Float!
    start_time: String!
    end_time: String!
    distance: Float
    travel_mode: String!
    user_id: ID!
  }
  input RideInputUpdate {
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

  type Reservation {
    _id: ID!
    user_id: ID!
    ride_id: ID!
    weight: Float!
    status: String
  }

  input ReservationInput {
    user_id: ID!
    ride_id: ID!
    weight: Float!
  }
  input ReservationUpdateInput {
    weight: Float
    status: String
  }

  type Payement {
    _id: ID!
    user_id: ID!
    payment_date: String
    payment_method: String
    amount: Float
  }

  input PayementInput {
    user_id: ID!
    payment_method: String
    amount: Float
  }

  type Transaction {
    _id: ID!
    user_id: ID!
    package_id: ID!
    ride_id: ID!
    transaction_date: String
    transaction_status: String
  }

  input TransactionInput {
    user_id: ID!
    package_id: ID!
    ride_id: ID!
    transaction_date: String
    transaction_status: String
  }
  input TransactionUpdateInput {
    transaction_status: String
  }

  type Notification {
    _id: ID!
    user_id: String
    notification_type: String
    message: String
    timestamp: String
  }

  input NotificationInput {
    user_id: String
    notification_type: String
    message: String
  }

  input NotificationUpdateInput {
    notification_type: String
    message: String
  }

  type Subscription {
    _id: ID!
    user_id: ID!
    start_date: String
    end_date: String
    subscription_status: String
    type: String
  }

  input SubscriptionInput {
    user_id: String
    start_date: String
    end_date: String
    subscription_status: String
    type: String
  }

  input SubscriptionUpdateInput {
    start_date: String
    end_date: String
    subscription_status: String
    type: String
  }

  type Review {
    _id: ID!
    user_id: ID!
    package_id: ID!
    rating: Float
    comment: String
  }

  input ReviewInput {
    user_id: ID!
    package_id: ID!
    rating: Float
    comment: String
  }

  input ReviewUpdateInput {
    rating: Float
    comment: String
  }

  input AuthInput {
    email: String
    password: String
  }

  type AuthData {
    user: User!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    getUser(ID: ID): User!
    login(input: AuthInput): AuthData!
    getUsers(amount: Int): [User]

    getRide(ID: ID): Ride!
    getRides(amount: Int): [Ride]

    getReservation(ID: ID): Reservation!
    getReservations(amount: Int): [Reservation]

    getPayement(ID: ID): Payement!
    getPayements(amount: Int): [Payement]

    getTransaction(ID: ID): Transaction!
    getTransactions(amount: Int): [Transaction]

    getNotification(ID: ID): Notification!
    getNotifications(amount: Int): [Notification]

    getSubscription(ID: ID): Subscription!
    getSubscriptions(amount: Int): [Subscription]

    getReview(ID: ID): Review!
    getReviews(amount: Int): [Review]
  }

  type Mutation {
    createUser(input: UserInput): User!
    deleteUser(ID: ID!): Boolean
    updateUser(ID: ID!, input: UserUpdateInput): User!

    createRide(input: RideInputCreate): Ride!
    deleteRide(ID: ID!): Boolean
    updateRide(ID: ID!, input: RideInputUpdate): Ride!

    createReservation(input: ReservationInput): Reservation!
    deleteReservation(ID: ID!): Boolean
    updateReservation(ID: ID!, input: ReservationUpdateInput): Reservation!

    createPayement(input: PayementInput): Payement!

    createTransaction(input: TransactionInput): Transaction!
    deleteTransaction(ID: ID!): Boolean
    updateTransaction(ID: ID!, input: TransactionUpdateInput): Transaction!

    createNotification(input: NotificationInput): Notification!
    deleteNotification(ID: ID!): Boolean
    updateNotification(ID: ID!, input: NotificationUpdateInput): Notification!

    createSubscription(input: SubscriptionInput): Subscription!
    deleteSubscription(ID: ID!): Boolean
    updateSubscription(ID: ID!, input: SubscriptionUpdateInput): Subscription!

    createReview(input: ReviewInput): Review!
    deleteReview(ID: ID!): Boolean
    updateReview(ID: ID!, input: ReviewUpdateInput): Review!
  }
`;
