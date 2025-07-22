const express = require('express')
const router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');
const { addReview, getReviews, updateReview, deleteReview } = require('../controller/reviewController');

// Add a review for a product

router.post('/', isAuthenticated, addReview);

// Get reviews for a product

router.get('/:productId', isAuthenticated, getReviews);

//update a review

router.post('/:reviewId', isAuthenticated, updateReview);

// Delete a review

router.delete('/:reviewId', isAuthenticated, deleteReview);

module.exports = router;