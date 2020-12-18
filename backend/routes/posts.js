// création d'un routeur
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts')

router.get('/', auth, postsCtrl.getPost);
router.get('/', auth, postsCtrl.getComments);
router.get('/:id', auth, postsCtrl.getUserPost);
router.post('/', auth, multer, postsCtrl.createPost);
router.post('/', auth, multer, postsCtrl.createComment);
router.post('/:id/likePost', auth, postsCtrl.likeAndDislikePosts);
router.post('/:id/likeCom', auth, postsCtrl.likeAndDislikeComments)
router.delete('/:id', auth, postsCtrl.deletePost);
router.delete('/:id', auth, postsCtrl.deleteComment);


module.exports = router;