const { createUser, findUserByPhone } = require('../models/userModel')
const { createCart } = require('../models/cartModel')
const { successResponse, errorResponse } = require('../utils/response')
const { responseMessages, constants } = require('../utils/constants')
const formatMessage = require('../utils/messageFormatter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
    const { phone, password } = req.body.data;
    console.log(req.body);

    try {
        const user = await findUserByPhone(phone);
        if (!user) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' });
            return errorResponse(res, message, 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const message = formatMessage(responseMessages.error.invalidCredentials, { operation: 'Password' });
            return errorResponse(res, message, 401);
        }

        const token = jwt.sign({ 'id': user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        const message = formatMessage(responseMessages.success.login, { operation: user.username });
        return successResponse(res, message, { token, user });
    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Login' });
        return errorResponse(res, message);
    }
};

const register = async (req, res) => {
    const { phone, username, password } = req.body.data;
    console.log(req.body);
    try {
        const user = await findUserByPhone(phone);
        if (user) {
            const message = formatMessage(responseMessages.error.alreadyExists, { operation: 'User' });
            return errorResponse(res, message, 409);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await createUser({ phone, username, password: hashedPassword });
        const cart = await createCart({ user: newUser });
        const message = formatMessage(responseMessages.success.register, { operation: username });
        return successResponse(res, message, newUser, 201);
    } catch (err) {
        console.log(err);
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Register information' });
        return errorResponse(res, message);
    }
};

module.exports = { login, register };