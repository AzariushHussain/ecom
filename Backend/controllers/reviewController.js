const { createReview, getAllReviews, findReviewById, findReviewByUserId, updateReview, deleteReview } = require('../models/reviewModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');

const createUserReview = async (req, res) => {
    const id = req.user._id;
    const data = req.body;
    try{
        const createdReview = await findReviewByUserId(id);
        if (createdReview) {
            const message = formatMessage(responseMessages.error.alreadyExists, { operation: 'Review' });
            return errorResponse(res, message, 409);
        }
        const review = await createReview({ ...data, userId: id });
        return successResponse(res, responseMessages.success.created, review, 201);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Create Review' });
        return errorResponse(res, message);
    }
};

const getUserReviews = async (req, res) => {
    const id = req.user._id;
    try {
        const reviews = await findReviewByUserId(id);
        return successResponse(res, responseMessages.success.found, reviews);
    }
    catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Get Reviews' });
        return errorResponse(res, message);
    }
};

const updateUserReview = async (req, res) => {
    const { reviewId } = req.params; 
    const data = req.body;

    try {
        const existingReview = await findReviewById(reviewId); 
        if (!existingReview) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'Review' });
            return errorResponse(res, message, 404);
        }
        
        const updatedReview = await updateReview(reviewId, data); 
        return successResponse(res, responseMessages.success.updated, updatedReview);
    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Update Review' });
        return errorResponse(res, message);
    }
};

const deleteUserReview = async (req, res) => {
    const { reviewId } = req.params; 

    try {
        const existingReview = await findReviewById(reviewId); 
        if (!existingReview) {
            const message = formatMessage(responseMessages.error.notFound, { operation: 'Review' });
            return errorResponse(res, message, 404);
        }

        const deletedReview = await deleteReview(reviewId); 
        return successResponse(res, responseMessages.success.deleted, deletedReview);
    } catch (err) {
        const message = formatMessage(responseMessages.error.invalidInput, { operation: 'Delete Review' });
        return errorResponse(res, message);
    }
};


module.exports = { createUserReview, getUserReviews, updateUserReview, deleteUserReview };