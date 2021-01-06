const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const joiValidate = require('../middleware/joiValidate');

const { LogSchema } = require('../models/log');
const { UserSchema } = require('../models/User');

const userCtrl = require('../controllers/user');

const rateLimit = require('express-rate-limit');
const connexionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    message: "too many tries: try again later !"
})

router.post('/signup', joiValidate(LogSchema), userCtrl.signup);
router.post('/login', connexionLimiter, joiValidate(LogSchema), userCtrl.login);
router.get('/user/:id', auth, userCtrl.getUser);
//router.get('/search/:id', auth, userCtrl.searchUsers);
router.put('/user/:id', joiValidate(UserSchema), userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);


module.exports = router