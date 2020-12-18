const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const db = require('../dbconfig');

const passwordScheme = require('../models/Passwords');
const { Signup } = require('../models/Signup');
const { User } = require('../models/User');

require('dotenv').config();

exports.signup = (req, res, next) => {
  let schema = Signup
  let data = req.body
  if (!passwordScheme.validate(data.password) || !schema.password.validate(data.password)) {
    throw { error: "invalid password" }
  } else {
    joi.validate(data, schema, (err, value) => {
      if (err) {
        res.send('an error occured')
      } else {
        bcrypt.hash(value.password, 10)
          .then(hash => {
            let admin = 0;
            let defaultPicture = `${req.protocol}://${req.get('host')}/images/user/user-3331257_960_720.png`;
            let values = [value.username, defaultPicture, value.email, hash, CURRENT_TIMESTAMP(), admin];
            let sql = "CALL signIn(?, ?, ?, ?, ?, ?);"
            db.query(sql, values, (error, result) => {
              if (error) {
                return res.status(400).json("error")
              }
              res.status(200).json("User created");
            })
          })
          .catch(error => res.status(500).json({ error }))
      }
    });
  }
}


exports.login = (req, res, next) => {
  let isAdmin = '';
  let email = [req.body.email];
  let sql = "CALL login(?);"
  db.query(sql, email, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    } if (result.length === 0) {
      return res.status(401).json("email adress not found !");
    }
    bcrypt.compare(req.body.password, result[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json("Incorrect password !");
        } if (result[0].admin === 0) {
          role = 'user'
        } else {
          role = 'admin'
        }
        res.status(200).json({
          iduser: result[0].iduser,
          username: result[0].username,
          role: role,
          token: jwt.sign(
            {
              iduser: result.iduser,
              role: isAdmin
            },
            process.env.TOKEN,
            { expiresIn: '48h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
};

exports.getUser = (req, res, next) => {
  let value = [req.params.id]
  let sql = "CALL getUser(?);"
  db.query(sql, value, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User Selected");
  });
}

exports.searchUsers = (req, res, next) => {
  let value = [req.body]
  let sql = "SELECT username, firstname, lastname FROM user WHERE ? LIKE '% ? %';"
  db.query(sql, value, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User found");
  });
}

exports.updateUser = (req, res, next) => {
  const { email, username, firstname, lastname, description, position, birthday } = req.body;
  const profile_picture = `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`;
  const id = req.params.id
  let values = [email, username, profile_picture, firstname, lastname, description, position, birthday, id]
  let sql = "CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?, ?);"
  db.query(sql, values, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User deleted");
  });
}

exports.deleteUser = (req, res) => {
  const id = req.params.id
  let value = [id]
  let sql = "CALL deleteUser(?);"
  db.query(sql, value, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    const filename = result.imageUrl.split('/images/user/')[1];
    fs.unlink(`images/${filename}`, () => {
      res.status(200).json("User deleted");
    })
  });
}