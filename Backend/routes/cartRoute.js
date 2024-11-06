const { getUserCart, updateUserCart } = require('../controllers/cartController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router
    .route('/')
    .get(getUserCart)
    .put(updateUserCart);

module.exports = router;