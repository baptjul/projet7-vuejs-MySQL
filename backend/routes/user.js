const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require('express-rate-limit');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const connexionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    message: "too many tries: try again later !"
})

router.post('/signup', userCtrl.signup);
router.post('/login', connexionLimiter, userCtrl.login);
router.get('/user/:id', auth, userCtrl.getUser);
router.get('/search/:id', auth, userCtrl.searchUsers);
router.put('/user/:id', auth, userCtrl.updateUser);
router.delete('/delete/:id', auth, userCtrl.deleteUser);


module.exports = router