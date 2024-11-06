const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const cartSchema = new mongoose.Schema(
    {
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
       
    },
    {
        timestamps: true
    }
);

module.exports = cartSchema;
