const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

// Remove EJS setup — not needed for React
router.get('/', paymentController.renderProductPage);
router.post('/createOrder', paymentController.createOrder);

module.exports = router;
