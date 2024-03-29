const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    reviews: [Review]
    reviewCount: Int
    follows: [User]
    followCount: Int
  }

  type Review {
    _id: ID    
    title: String
    gameTitle: String
    gameCoverUrl: String
    gameId: String
    reviewBody: String
    rating: Int
    createdAt: String
    username: String
  }

  type Game {
    _id: ID
    name: String
    gameId: String
    coverUrl: String
    summary: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
    reviewGame(gameId: String!): [Review]
    games: [Game]
    game(gameId: String!): Game
  } 

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(title: String!, gameTitle: String!, gameCoverUrl: String!, gameId: String!, reviewBody: String!, rating: Int!): Review
    addFollow(followId: ID!): User
    removeFollow(followId: ID!): User
    editReview(_id: ID!, title: String!, reviewBody: String!, rating: Int!): Review
    deleteReview(_id: ID!): Review
    addGame(name: String!,gameId: String!, coverUrl: String!, summary: String!): Game
  }
  
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;