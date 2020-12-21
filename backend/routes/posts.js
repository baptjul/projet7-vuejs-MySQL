// création d'un routeur
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts')

router.get('/', postsCtrl.getPost);
router.get('/:id', auth, postsCtrl.getUserPost);
router.post('/', auth, multer, postsCtrl.createPost);
router.post('/:id/likePost', auth, postsCtrl.likeAndDislikePosts);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;