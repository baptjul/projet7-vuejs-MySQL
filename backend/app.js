const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const helmet = require("helmet");

require("dotenv").config();

// import du router
const postsRoutes = require('./routes/posts');
// import des login
const userRoutes = require('./routes/user');

const app = express();

// gestion de l'acces,
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Sécurité contre les injections
app.use(helmet());

// gestion de la session utilisateu
app.use(session({
  secret: process.env.SessionKey,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 86400000,
    sameSite: 'strict'
  }
}))

// url des images définit
app.use('/images', express.static(path.join(__dirname, 'images')))

// definition de l'url de l'api et des routes
app.use('/api/posts', postsRoutes)
// pour les login et mdp
app.use('/api/auth', userRoutes)

module.exports = app;