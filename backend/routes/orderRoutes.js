const express = require('express');
const router = express.Router();

const {createOrder, getUserOrders, updateOrderStatus, 
       deleteOrder,getVendorOrders} = require('../controller/orderController');

const { isAuthenticated, restrictTo } = require('../middlewares/auth');

// Create a new order
router.post('/', isAuthenticated, createOrder);

// Get orders for the authenticated user
router.get('/', isAuthenticated, getUserOrders);


// Get all orders for the vendor's restaurant
router.get('/vendor/orders', isAuthenticated, restrictTo('vendor'), getVendorOrders);

// Update the status of an order
router.put('/:orderId/status', isAuthenticated, restrictTo('admin', 'vendor'), updateOrderStatus);

// Delete an order
router.delete('/:orderId', isAuthenticated, restrictTo('admin', 'vendor'), deleteOrder);

module.exports = router;

