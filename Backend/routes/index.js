const express = require('express');
const router = express.Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const reviewRoute = require('./reviewRoute');
const orderRoute = require('./orderRoute');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/review', reviewRoute);
router.use('/order', orderRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);

module.exports = router;