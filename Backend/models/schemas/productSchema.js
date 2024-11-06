const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const productSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
          validator: function(v) {
            return v > 0;
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'price' })
        }
      },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        validate: {
          validator: function(v) {
            return v >= 0;
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'stock' })
        }
      },
    image: {
        type: String,
        required: true,
        trim: true
    },
    qtysold: {
        type: Number,
        required: true,
        validate: {
          validator: function(v) {
            return v >= 0;
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'quantity' })
        }
      },
    overallrating: {
        type: Number,
        required: true,
        validate: {
          validator: function(v) {
            return v >= 0 && v <= 5;
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'overall rating' })
        }
      },
},
{
    timestamps: true,
});

module.exports = productSchema ;