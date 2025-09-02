const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {

    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {


        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity }],
                totalPrice: 0
            });
        } else {
            // Check if the product already exists in the cart
            const existingProduct = cart.products.find(p => p.productId.toString() === productId);
            if (existingProduct) {
                // Update the quantity of the existing product
                existingProduct.quantity += quantity;
            } else {
                // Add a new product to the cart
                cart.products.push({ productId, quantity });
            }
        }
        // Calculate the total price
        const product = await Product.findById(productId);
        if (product) {
            cart.totalPrice += product.price * quantity;
        }
        // Save the cart
        await cart.save();
        res.status(200).json({ message: "Product added to cart successfully", cart });

    }
    catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

exports.updateCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // Find the product in the cart
        // const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        const productIndex = cart.products.findIndex(p => {
            const pid = p.productId?._id || p.productId;
            return pid.toString() === productId;
        });

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        // Update the quantity
        if (quantity <= 0) {
            // Remove the product if quantity is 0 or less
            cart.products.splice(productIndex, 1);
        }
        else {
            cart.products[productIndex].quantity = quantity;
        }
        // Recalculate total price
        cart.totalPrice = cart.products.reduce((total, item) => {
            const product = item.productId;

            // Fallback in case product is null or missing price
            const price = product?.price || 0;
            return total + (price * item.quantity);
        }, 0);
        // Save the updated cart
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    }
    catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteCart = async (req, res) => {
    const userId = req.user._id;

    try {
        // Find and delete the cart for the user
        const cart = await Cart.findOneAndDelete({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


