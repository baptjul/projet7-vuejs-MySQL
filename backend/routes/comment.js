// création d'un routeur
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const joiValidate = require('../middleware/joiValidate');

const { CommentSchema } = require('../models/Comments');

const comCtrl = require('../controllers/comments')

router.get('/:id', auth, comCtrl.getComments);
router.post('/', auth, multer, joiValidate(CommentSchema), comCtrl.createComment);
router.post('/:id/likeCom', auth, comCtrl.likeAndDislikeComments)
router.delete('/:id', auth, comCtrl.deleteComment);

module.exports = router;