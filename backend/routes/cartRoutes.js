const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, deleteCart } = require('../controller/cartController');
const { isAuthenticated } = require('../middlewares/auth');

// Add a product to the cart
router.post('/', isAuthenticated, addToCart);

// Get the user's cart
router.get('/', isAuthenticated, getCart);

// Update the cart (e.g., change quantity of a product)
router.put('/', isAuthenticated, updateCart);

// Delete the cart
router.delete('/', isAuthenticated, deleteCart);

module.exports = router;