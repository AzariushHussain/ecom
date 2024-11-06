const { CartModel } = require('./utils/schemaLoader');

const createCart = async (data) => {
    const cart = new CartModel(data);
    return await cart.save();
};

const getCartByUserId = async (userId) => {
    return await CartModel.findOne({ user: userId });
};

const getCartById = async (id) => {
    return await CartModel.findOne({ _id: id });
};

const updateCart = async (id, products) => {
    return await CartModel.findOneAndUpdate({ _id: id }, {products:products}, { new: true });
};

module.exports = { createCart, getCartByUserId, getCartById, updateCart };