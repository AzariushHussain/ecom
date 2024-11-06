const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const productSchema = require('../schemas/productSchema');
const reviewSchema = require('../schemas/reviewSchema');
const transactionSchema = require('../schemas/transactionSchema');
const orderSchema = require('../schemas/orderSchema');
const cartSchema = require('../schemas/cartSchema');

const UserModel = mongoose.model('User', userSchema);
const ProductModel = mongoose.model('Product', productSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);
const TransactionModel = mongoose.model('Transaction', transactionSchema);
const OrderModel = mongoose.model('Order', orderSchema);
const CartModel = mongoose.model('Cart', cartSchema);

module.exports = { UserModel, ProductModel, ReviewModel, TransactionModel, OrderModel, CartModel };