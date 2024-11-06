const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: function(v) {
                return v.usertype !== constants.user.type.STANDARD;
            },
            message: formatMessage(responseMessages.error.invalidInput, { operation: 'user' })
        }
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: false
            },
            quantity: {
                type: Number,
                required: false,
                validate: {
                    validator: function(v) {
                        return v > 0;
                    },
                    message: formatMessage(responseMessages.error.invalidInput, { operation: 'quantity' })
                }
            },
            total: {
                type: Number,
                required: false,
                validate: {
                    validator: function(v) {
                        return v > 0;
                    },
                    message: formatMessage(responseMessages.error.invalidInput, { operation: 'total' })
                }
            }
        }
    ],
    total: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: formatMessage(responseMessages.error.invalidInput, { operation: 'total' })
        }
    },
    status: {
        type: String,
        required: false,
        enum: [constants.order.status.PENDING, constants.order.status.ACCEPTED, constants.order.status.DELIVERED, constants.order.status.CANCELLED],
        default: constants.order.status.ACCEPTED
    },
    shippingDetails: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: formatMessage(responseMessages.error.invalidInput, { operation: 'address' })
        }
    },
paymentMethod: {
    type: String,
    required: true,
    enum: [constants.order.paymentMethod.CARD, constants.order.paymentMethod.COD],
    default: constants.order.paymentMethod.COD
},
paymentDetails:{
    type: String,
    required: false,
    validate: {
        validator: function(v) {
            return v.length > 0;
        },
        message: formatMessage(responseMessages.error.invalidInput, { operation: 'payment details' })
}
}
},
{
    timestamps: true,
});

module.exports = orderSchema;