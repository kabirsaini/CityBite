const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Group products by restaurantId
    const productsByRestaurant = {};
    cart.products.forEach(item => {
      const product = item.productId;
      const restId = product.restaurantId.toString();

      if (!productsByRestaurant[restId]) {
        productsByRestaurant[restId] = [];
      }

      productsByRestaurant[restId].push({
        productId: product._id,
        quantity: item.quantity
      });
    });

    const createdOrders = [];

    for (const [restaurantId, items] of Object.entries(productsByRestaurant)) {
      const totalPrice = items.reduce((sum, item) => {
        const product = cart.products.find(p => p.productId._id.toString() === item.productId.toString());
        return sum + (product?.productId?.price || 0) * item.quantity;
      }, 0);

      const order = await Order.create({
        userId,
        restaurantId,
        products: items,
        totalPrice
      });

      await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id } },
        { new: true }
      );

      createdOrders.push(order);
    }

    // Clear cart after placing all orders
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Orders placed successfully", orders: createdOrders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserOrders = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find all orders for the user
        const orders = await Order.find({ userId }).populate('products.productId');

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        // Find all orders
        const orders = await Order.find().populate('userId', 'name email').populate('products.productId');

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getOrderById = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by ID
        const order = await Order.findById(orderId).populate('userId', 'name email').populate('products.productId', 'name image price');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    try {
        // Validate status
        if (!['Pending', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Update the order status
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Delete the order
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

exports.getVendorOrders = async (req, res) => {
  const vendorId = req.user._id;

  try {
    // Find the vendor's restaurant
    const restaurant = await Restaurant.findOne({ owner: vendorId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found for this vendor" });
    }

    // Find all orders for that restaurant
    const orders = await Order.find({ restaurantId: restaurant._id })
      .populate('userId', 'name email') // who placed the order
      .populate('products.productId');  // what was ordered

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
