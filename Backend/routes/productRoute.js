const { getHomeProducts, getProduct } = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/home', getHomeProducts);
router.get('/:productId?/:name?/:category?', getProduct);

module.exports = router;