const { TransactionModel } = require('./utils/schemaLoader');

const createTransaction = async (data) => {
    const transaction = new TransactionModel(data);
    return await transaction.save();
}

const getTransactions = async () => {
    return await TransactionModel.find();
}

const findTransactionById = async (id) => {
    return await TransactionModel.findOne({ _id: id }); 
}

module.exports = { createTransaction, getTransactions, findTransactionById };