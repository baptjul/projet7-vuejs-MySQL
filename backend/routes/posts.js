const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const joiValidate = require('../middleware/joiValidate');

const { PostSchema } = require('../models/Posts');

const postsCtrl = require('../controllers/posts')

router.get('/', auth, postsCtrl.getPost);
router.get('/:id', auth, postsCtrl.getUserPost);
router.get('/:iduser/:idpost/likePost', auth, postsCtrl.likeOnPost)
router.post('/', auth, multer, joiValidate(PostSchema), postsCtrl.createPost);
router.post('/:id/likePost', postsCtrl.likeAndDislikePosts);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;