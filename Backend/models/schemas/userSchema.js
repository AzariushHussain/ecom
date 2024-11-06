const mongoose = require('mongoose');
const { constants, responseMessages } = require('../../utils/constants');
const formatMessage = require('../../utils/messageFormatter');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^[6-9]\d{9}$/.test(v);
          },
          message: formatMessage(responseMessages.error.invalidInput, { operation: 'Phone number' })
        },
        unique: true
      },
      usertype: {
        type: String,
        required: true,
        enum: [constants.user.type.STANDARD, constants.user.type.ADMIN],
        default: constants.user.type.STANDARD        
      },
      password: { 
        type: String,
        required: true,
        trim: true,
        minlength: 6 
    },
},
{
    timestamps: true,
});

module.exports = userSchema ;