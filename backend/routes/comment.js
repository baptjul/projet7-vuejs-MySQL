// création d'un routeur
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const comCtrl = require('../controllers/comments')

router.get('/', auth, comCtrl.getComments);
router.post('/', auth, multer, comCtrl.createComment);
router.post('/:id/likeCom', auth, comCtrl.likeAndDislikeComments)
router.delete('/:id', auth, comCtrl.deleteComment);

module.exports = router;