const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbconfig');
const fs = require('fs');
const passwordScheme = require('../models/Passwords');

const Token = (user, username, role) => {
  token = jwt.sign({
    iduser: user,
    username: username,
    role: role
  },
    process.env.TOKEN,
    { expiresIn: '48h' })
  return { token }
}

exports.signup = (req, res) => {
  const data = req.body
  if (!passwordScheme.validate(data.password)) {
    throw { error: "invalid password" }
  } else {
    bcrypt.hash(data.password, 10)
      .then(hash => {
        let admin = 0;
        let defaultPicture = `${req.protocol}://${req.get('host')}/images/user/icon.png`;
        const values = [data.username, defaultPicture, data.email, hash, admin];
        const sql = "INSERT INTO user (username, profile_picture, email, password, creation_date, admin) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), ?);"
        db.query(sql, values, (error, result) => {
          if (error) {
            return res.status(400).json(error)
          }
          return res.status(200).json(Token(result.insertId, data.username, 'user'));
        })
      })
      .catch(error => res.status(500).json({ error }))
  }
}


exports.login = (req, res) => {
  let role = '';
  const email = [req.body.email];
  const sql = "SELECT iduser, username, email, password, admin FROM user WHERE email = ?;"
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
        } if (result[0].admin === 1) {
          role = 'admin'
        } else {
          role = 'user'
        }
        console.log("user logged")
        return res.status(200).json(
          Token(result[0].iduser, result[0].username, role)
        );
      })
      .catch(error => res.status(500).json({ error }));
  })
};

exports.getUser = (req, res) => {
  const value = [req.params.id]
  const sql = "SELECT * FROM user WHERE iduser = ?;"
  db.query(sql, value, (error, result) => {
    if (error) {
      return res.status(401).json("database not connected !");
    }
    return res.status(200).json(result);
  });
}

exports.updateUser = (req, res) => {
  const { email, username, firstname, lastname, description, position, birthday } = req.body;
  const id = req.params.id;
  const values = [email, username, firstname, lastname, description, position, birthday, id]
  const sql = "UPDATE user SET email= ?, username= ?, firstname= ?, lastname= ?, description= ?, position= ?, birthday= ? WHERE iduser = ?;"
  const refresh = "SELECT * FROM user WHERE iduser = ?;"
  db.query(sql, values, (error, result) => {
    if (error) {
      return res.status(401).json(error);
    }
    db.query(refresh, id, (error, result) => {
      if (error) {
        return res.status(401).json(error);
      }
      return res.status(200).json(result);
    });
  });
}

exports.updateProfilePicture = (req, res) => {
  const id = req.params.id;
  const data = `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`
  const values = [data, id]
  const sql = "UPDATE user SET profile_picture= ? WHERE iduser = ?;"
  const getUser = "SELECT * FROM user WHERE iduser = ?;"
  db.query(getUser, id, (error, result) => {
    if (error) {
      return res.status(401).json(error);
    }
    const filename = result[0].profile_picture.split('/images/user/')[1];
    if (filename !== 'icon.png') {
      fs.unlink(`images/user/${filename}`, (err) => {
        if (err) {
          console.log("failed to delete local image:" + err);
        }
      })
    }
    db.query(sql, values, (error, result) => {
      if (error) {
        return res.status(401).json(error);
      }
      db.query(getUser, id, (error, result) => {
        if (error) {
          return res.status(401).json(error);
        }
        return res.status(200).json(result);
      });
    });
  });
}

exports.deleteUser = (req, res) => {
  const id = req.params.id
  const value = [id]
  const checkUser = "SELECT * FROM user WHERE iduser = ?;"
  const sql = "DELETE FROM user WHERE iduser = ?;"
  db.query(checkUser, value, (error, result) => {
    if (error) {
      return res.status(401).json(error);
    }
    if (result[0].profile_picture !== 'http://localhost:3000/images/user/icon.png') {
      const filename = result[0].profile_picture.split('/images/user/')[1];
      fs.unlink(`images/user/${filename}`, (err) => {
        if (err) {
          console.log("failed to delete local image:" + err);
        }
      })
    }
    db.query(sql, value, (error, result) => {
      if (error) {
        return res.status(401).json(error);
      }
      console.log('message supprimé')
      return res.status(200).json(result);
    });
  });
}