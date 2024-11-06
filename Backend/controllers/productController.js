const {  getProducts, getTopProducts, getPopularProducts, findProductById, findProductByCategory, findProductsByName } = require ('../models/productModel');  
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

const getHomeProducts = async (req, res) => {
    try {
        const [topProducts, popularProducts] = await Promise.all([
            getTopProducts(),       
            getPopularProducts()    
        ]);

        const responseData = {
            topProducts,
            popularProducts
        };

        return successResponse(res, responseMessages.success.found, responseData);
    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Home Products' });
        return errorResponse(res, message);
    }
};

const getProduct = async (req, res) => {
    const { productId, name, category } = req.params;
    try {
        if (productId) {
            const product = await findProductById(productId);
            return successResponse(res, responseMessages.success.found, product);
        }
        if (name) {
            const products = await findProductsByName(name);
            return successResponse(res, responseMessages.success.found, products);
        }
        if (category) {
            const products = await findProductByCategory(category);
            return successResponse(res, responseMessages.success.found, products);
        }

    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Product' });
        return errorResponse(res, message);
    }
}

module.exports = { getHomeProducts, getProduct };