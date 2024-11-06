const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const reviewSchema = new mongoose.Schema({
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
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        validate: {
          validator: function(v) {
            return v >= 1 && v <= 5;
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'rating' })
        }
      },
    review: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true,
});

module.exports = reviewSchema;