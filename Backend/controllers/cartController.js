const { createCart, getCartByUserId, getCartById, updateCart } = require('../models/cartModel');    
const { findProductById } = require('../models/productModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

const getUserCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await getCartByUserId(userId);
        const cartWithProducts = await Promise.all(cart.products.map(async (item) => {
            const product = await findProductById(item.productId);
            console.log(`product: ${JSON.stringify(product)}`);
            return {
                id: item._id,
                quantity: item.quantity,
                total: item.total,
                product: {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    qtysold: product.qtysold,
                    stock: product.stock,
                    overallrating: product.overallrating
                }
            };
        }));
        
        const message = formatMessage(responseMessages.success.fetched, { operation: 'Cart' });
        return successResponse(res, message, cartWithProducts);
    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Cart' });
        return errorResponse(res, message);
    }
};




const updateUserCart = async (req, res) => {
    const userId = req.user.id;
    const products = req.body;
    try {
        const cart = await getCartByUserId(userId);
        console.log(`cart: ${JSON.stringify(cart)}`);
        for (let product of products) {
            const productInfo = await findProductById(product.productId);
            const productData = {
                productId: product.productId,
                quantity: product.quantity,
                total: productInfo.price * product.quantity
            }
            cart.products.push(productData);
        }
        const updatedCart = await updateCart(cart._id, cart.products);
        console.log(`data: ${JSON.stringify(updatedCart)}`);
        const message = formatMessage(responseMessages.success.updated, { operation: 'Cart' });
        return successResponse(res, message, updatedCart);
    }
    catch (err) {
        console.log(err);
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Cart' });
        return errorResponse(res, message);
    }
}

module.exports = { getUserCart, updateUserCart };