const { createOrder, getOrdersByUserId, getOrderById, updateOrder }  = require('../models/orderModel'); 
const { getCartByUserId, updateCart } = require('../models/cartModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

const createUserOrder = async (req, res) => {
    const userId = req.user.id;
    const cart = await getCartByUserId(userId);
    const data = req.body;
    console.log(`cart products: ${JSON.stringify(cart.products)}`);
    console.log(
        `cart total: ${cart.products
          .map((item) => item.total).reduce((acc, curr) => acc + curr)}`
      );    try {
        const orderToCreate = {
            user: req.user.id,
            products: cart.products,
            total: cart.products.map(item => item.total).reduce((acc, curr) => acc + curr),
            shippingDetails: JSON.stringify(data.shippingDetails),
            paymentMethod: data.paymentMethod,
            paymentDetails: JSON.stringify(data.paymentDetails)
        }
        const order = await createOrder( orderToCreate );
        // await updateCart(cart._id, { products: [] });
        const message = formatMessage(responseMessages.success.created, { operation: 'Order' });
        return successResponse(res, message, order, 201);
    }
    catch (err) {
        console.log(`err: ${err}`);
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Create Order' });
        return errorResponse(res, message);
    }
};

const getOrders = async (req, res) => {
    const userId = req.user._id;
    try {
        const orders = await getOrdersByUserId(userId);
        return successResponse(res, responseMessages.success.found, orders);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Orders' });
        return errorResponse(res, message);
    }
};

const getOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await getOrderById(id);
        return successResponse(res, responseMessages.success.found, order);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Order' });
        return errorResponse(res, message);
    }
};

const updateUserOrder = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const order = await updateOrder(id, data);
        return successResponse(res, responseMessages.success.updated, order);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Update Order' });
        return errorResponse(res, message);
    }
};

module.exports = { createUserOrder, getOrders, getOrder, updateUserOrder };