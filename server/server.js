require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');
//const routes = require('./routes');

const PORT = process.env.PORT || 3002;
const app = express();




async function startApolloServer() {
  let apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startApolloServer();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(routes);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});