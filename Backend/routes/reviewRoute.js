const { createUserReview, getUserReviews, updateUserReview, deleteUserReview } = require('../controllers/reviewController');
const express = require('express');
const router = express.Router();

router
    .route('/review')
    .post(createUserReview)
    .get(getUserReviews)

router
    .route('/review/:reviewId')
    .put(updateUserReview) 
    .delete(deleteUserReview);  

module.exports = router;