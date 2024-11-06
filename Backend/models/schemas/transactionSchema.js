const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const transactionSchema = new mongoose.Schema({
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
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMode: {
        type: String,
        required: true,
        enum: [constants.order.paymentMethod.CARD, constants.order.paymentMethod.COD],   
        default: constants.order.paymentMethod.COD
    },
    status: {
        type: String,
        required: true,
        enum: [constants.transaction.status.PENDING, constants.transaction.status.COMPLETED, constants.transaction.status.CANCELLED],
        default: constants.transaction.status.PENDING
    }
},
{
    timestamps: true,
});

module.exports = transactionSchema;