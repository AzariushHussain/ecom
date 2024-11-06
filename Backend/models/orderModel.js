const { OrderModel } = require('./utils/schemaLoader');

const createOrder = async (data) => {
    const order = new OrderModel(data);
    console.log(`order: ${JSON.stringify(order)}`);
    return await order.save();
};

const getOrdersByUserId = async (userId) => {
    return await OrderModel.find({ userId });
};

const getOrderById = async (id) => {
    return await OrderModel.findOne({ _id: id });
};

const updateOrder = async (id, data) => {
    return await OrderModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

module.exports = { createOrder, getOrdersByUserId, getOrderById, updateOrder };