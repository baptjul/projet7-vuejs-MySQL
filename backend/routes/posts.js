// création d'un routeur
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts')

router.get('/', auth, postsCtrl.getAllSauces);
router.post('/', auth, multer, postsCtrl.createSauce);
router.post('/:id/like', auth, postsCtrl.likeAndDislike);
router.get('/:id', auth, postsCtrl.getOneSauce);
router.put('/:id', auth, multer, postsCtrl.modifySauce);
router.delete('/:id', auth, postsCtrl.deleteSauce);


module.exports = router;
