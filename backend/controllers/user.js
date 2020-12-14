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
            let sql = `INSERT INTO user (username, profile_picture, email, password, creation_date, admin) VALUES ("${value.username}", "${defaultPicture}", "${value.username}", "${value.email}", "${hash}", "CURRENT_TIMESTAMP()", "${admin}");`
            db.query(sql, (error, result) => {
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
  let email = req.body.email;
  let sql = `SELECT email, password, admin FROM user WHERE email="${email}";`
  db.query(sql, (error, result) => {
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
          isAdmin = 'user'
        } else {
          isAdmin = 'admin'
        }
        res.status(200).json({
          iduser: result[0].iduser,
          username: result[0].username,
          role: isAdmin,
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
  let sql = `SELECT * FROM user WHERE iduser = ${req.params.id}`
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User Selected");
  });
}

exports.searchUsers = (req, res, next) => {
  let sql = `SELECT iduser, username, firstname, lastname FROM user WHERE ? LIKE '%${req.body}%';`
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User found");
  });
}

exports.updateUser = (req, res, next) => {
  const email = req.body.email
  const username = req.body.username
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const description = req.body.description
  const position = req.body.position
  const birthday = req.body.birthday
  const profile_picture = `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`
  let sql = `UPDATE user SET email='${email}', username='${username}', profile_picture='${profile_picture}', firstname='${firstname}', lastname='${lastname}', description='${description}', position='${position}', birthday='${birthday}', WHERE iduser = ${req.params.id}`
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    res.status(200).json("User deleted");
  });
}

exports.deleteUser = (req, res) => {
  let sql = `DELETE FROM user WHERE iduser = ${req.params.id};`
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    const filename = result.imageUrl.split('/images/user/')[1];
    fs.unlink(`images/${filename}`, () => {
      res.status(200).json("User deleted");
    })
  });
}