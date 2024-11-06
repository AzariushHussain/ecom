const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router
  .route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);

module.exports = router;