const { createUserOrder, getOrders, getOrder, updateUserOrder } = require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router
    .route('/')
    .post(createUserOrder)
    .get(getOrders)

router
    .route('/:orderId')
    .get(getOrder)
    .put(updateUserOrder);

module.exports = router;