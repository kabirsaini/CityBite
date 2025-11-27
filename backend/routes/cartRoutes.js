const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    updateCart,
    deleteCart,
    increaseQuantity,
    decreaseQuantity,
    removeProduct
} = require('../controller/cartController');

const { isAuthenticated } = require('../middlewares/auth');

// Add item to cart
router.post('/', isAuthenticated, addToCart);

// Get full cart
router.get('/', isAuthenticated, getCart);

// Update specific item quantity (for manual quantity input)
router.put('/', isAuthenticated, updateCart);

// Increase item quantity (+)
router.put('/increase/:productId', isAuthenticated, increaseQuantity);

// Decrease item quantity (-)
router.put('/decrease/:productId', isAuthenticated, decreaseQuantity);

// Remove a single product
router.delete('/:productId', isAuthenticated, removeProduct);

// Clear cart
router.delete('/', isAuthenticated, deleteCart);

module.exports = router;
