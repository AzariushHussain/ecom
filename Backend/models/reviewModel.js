const { ReviewModel } = require('./utils/schemaLoader');

const createReview = async (data) => {
    const review = new ReviewModel(data);
    return await review.save();
};

const getAllReviews = async () => {
    return await ReviewModel.find();
};

const findReviewById = async (id) => {
    return await ReviewModel.findOne({ _id: id });
};

const findReviewByUserId = async (userId) => {
    return await ReviewModel.find({ userId });
};

const updateReview = async (id, data) => {
    return await ReviewModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteReview = async (id) => {
    return await ReviewModel.findOneAndDelete({ _id: id });
};

module.exports = { createReview, getAllReviews, findReviewById, findReviewByUserId, updateReview, deleteReview };