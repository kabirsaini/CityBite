
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');


exports.createProduct = async (req, res) => {


    // step:1 (authorize the user to create a product)

    try {

        const restaurant = await Restaurant.findOne({ owner: req.user._id });

        if (!restaurant) {
            return res.status(403).json({ message: "You must register your restaurant first." });
        }
        const { name, description, price, category, isAvailable } = req.body;

        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        // step:2 (create the product)

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            restaurantId: restaurant._id, // assuming the user has a restaurantId in their profile
            isAvailable,
            createdBy: req.user._id // assuming req.user contains the authenticated user's info
        });

        res.status(201).json({ message: "Product created successfully", product });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



exports.getRestaurantProducts = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const products = await Product.find({ restaurantId });

        res.status(200).json({ products });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch items of restaurant" });
    }
};



exports.getAllProducts = async (req, res) => {
    // step:1 (get all products)

    try {
        const restaurant = await Restaurant.findOne({ owner: req.user._id });
        if (!restaurant) {
            return res.status(404).json({ message: "You must register your restaurant first." });
        }
        const products = await Product.find({ restaurantId: restaurant._id });
        res.status(200).json({ products });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to fetch products" });
    }
}

exports.getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const products = await Product.find({ category })
        .populate("restaurantId", "name address");

        if (products.length === 0) {
            return res.status(404).json({ message: "No product found in this category" });
        }

        res.status(200).json({ products });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.updateProduct = async (req, res) => {

    // step:1 (update the product)
    try {

        const { productId } = req.params;

        const { name, description, price, category, image, isAvailable } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                category,
                image,
                isAvailable
            },
            { new: true } // return the updated document
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteProduct = async (req, res) => {
    // step:1 (delete the product)
    try {

        const { productId } = req.params;

        const deleteproduct = await Product.findByIdAndDelete(productId);
        if (!deleteproduct) {
            res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deleteproduct });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}