// Token de connexion
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;
    if (req.body.userId && req.body.userId !== userId & admin == 0) {
      throw 'Invalid user ID';
    }
    else {
      next();
    }
  } catch {
    res.status(401).json({ error: error | 'Unauthenticated request !' })
  }
};
