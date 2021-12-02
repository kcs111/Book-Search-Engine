const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input SavedBooks{
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Books]
  }

  type Books {
    _id: ID
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }
  
  type Auth{
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: SavedBooks): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;