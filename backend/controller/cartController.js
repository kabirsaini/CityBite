const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity = 1, city } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity, city }]
            });
        } else {
            const existingItem = cart.products.find(
                p => p.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity, city });
            }
        }

        // Recalculate total price always
        const populatedCart = await cart.populate("products.productId");

        cart.totalPrice = populatedCart.products.reduce((acc, item) => {
            return acc + item.productId.price * item.quantity;
        }, 0);

        await cart.save();
        res.status(200).json({ message: "Added to cart", cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const index = cart.products.findIndex(p => {
            return (p.productId?._id || p.productId)?.toString() === productId;
        });

        if (index === -1)
            return res.status(404).json({ message: "Product not found in cart" });

        if (quantity <= 0) {
            cart.products.splice(index, 1);
        } else {
            cart.products[index].quantity = quantity;
        }

        // Remove dead products
        cart.products = cart.products.filter(p => p.productId);

        // Recalculate total
        cart.totalPrice = cart.products.reduce((total, item) => {
            const price = item.productId?.price || 0;
            return total + price * item.quantity;
        }, 0);

        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


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

exports.increaseQuantity = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        const item = cart.products.find(
            p => p.productId?._id.toString() === productId
        );

        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity += 1;

        cart.totalPrice = cart.products.reduce((sum, item) => {
            return sum + (item.productId.price * item.quantity);
        }, 0);

        await cart.save();

        res.json({ message: "Quantity increased", cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error" });
    }
};

// --------------------------------------------------------------------
// DECREASE QUANTITY (-)
// --------------------------------------------------------------------
exports.decreaseQuantity = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        const item = cart.products.find(
            p => p.productId?._id.toString() === productId
        );

        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Remove item if quantity becomes 0
            cart.products = cart.products.filter(
                p => p.productId._id.toString() !== productId
            );
        }

        cart.totalPrice = cart.products.reduce((sum, item) => {
            return sum + (item.productId.price * item.quantity);
        }, 0);

        await cart.save();

        res.json({ message: "Quantity decreased", cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error" });
    }
};

// --------------------------------------------------------------------
// REMOVE PRODUCT FROM CART
// --------------------------------------------------------------------
exports.removeProduct = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(
            p => p.productId.toString() !== productId
        );

        await cart.save();

        res.json({ message: "Item removed", cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal error" });
    }
};


