// Token de connexion
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const admin = decodedToken.admin;
    if (admin === 0) {
      throw 'Invalid use';
    }
    else {
      next();
    }
  } catch {
    res.status(401).json({ error: error | 'Unauthenticated request !' })
  }
};
