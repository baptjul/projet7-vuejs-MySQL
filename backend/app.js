const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const helmet = require("helmet");
require("dotenv").config();

const postsRoutes = require('./routes/posts');
const comRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Sécurité contre les injections
app.use(helmet());

// gestion de la session utilisateur
app.use(session({
  secret: process.env.SESSIONKEY,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 86400000,
    sameSite: 'strict'
  }
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/posts', postsRoutes);
app.use('/api/comments', comRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;