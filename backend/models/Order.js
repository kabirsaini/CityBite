const mongoose = require('mongoose');
// Define the Order schema

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  restaurantId: { // ✅ Top-level field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },

  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Order', orderSchema);