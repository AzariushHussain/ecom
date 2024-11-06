const { findUserById, updateUser, deleteUser } = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

const getUserProfile = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await findUserById(id);
        if (!user) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' });
            return errorResponse(res, message, 404);
        }
        return successResponse(res, responseMessages.success.found, user);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get User Profile' });
        return errorResponse(res, message);
    }
};

const updateUserProfile = async (req, res) => {
    const id = req.user._id;
    const data = req.body;
    try {
        const user = await updateUser(id, data);
        if (!user) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' });
            return errorResponse(res, message, 404);
        }
        return successResponse(res, responseMessages.success.updated, user);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'User Profile' });
        return errorResponse(res, message);
    }
};

const deleteUserProfile = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await deleteUser(id);
        if (!user) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'User' });
            return errorResponse(res, message, 404);
        }
        return successResponse(res, responseMessages.success.deleted, user);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'User Profile' });
        return errorResponse(res, message);
    }
}

module.exports = { getUserProfile, updateUserProfile, deleteUserProfile };