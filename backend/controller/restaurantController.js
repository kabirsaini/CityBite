const mongoose = require('mongoose');
const resturant = require('../models/Restaurant');
// const jwt = require('jsonwebtoken');
// const  {isAuthenticated} = require('../middlewares/auth');
const User = require('../models/User');


const createRestaurant = async (req, res) => {
    try {

        // checking the existence of the user

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // checking if the user is a vendor
        if (user.role !== 'vendor') {
            return res.status(403).json({ message: "Access denied. Only vendors can create restaurants." });
        }


        // Extract restaurant details from request body


        const { name, description, address, location, categories, openingHours, gsti, phone } = req.body;

        let categoriesArray = [];
        if (Array.isArray(categories)) {
            categoriesArray = categories;
        } else if (categories) {
            categoriesArray = [categories];
        }
        console.log("Processed categoriesArray:", categoriesArray);
        console.log("CategoriesArray length:", categoriesArray.length);


        const image = req.file ? req.file.path : null;

        // Validate required fields
        if (!name || !address || !location || !categories || !openingHours) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Create new restaurant
        const restaurant = await resturant.create({
            name,
            description,
            address,
            image,
            location,
            categories: categoriesArray,
            openingHours,
            gsti,
            phone,
            owner: req.user._id // ✅ This is mandatory
        });

        await User.findByIdAndUpdate(req.user._id, { restaurantRegistered: true });

        res.status(201).json({ message: "Restaurant created successfully", restaurant });


    } catch (error) {
        console.error("Create Restaurant Error:", error);
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllRestaurants = async (req, res) => {

    try {

        const restaurants = await resturant.find().populate('products');

        res.status(200).json({ message: "Restaurants fetched successfully", restaurants });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRestaurnatById = async (req, res) => {

    try {

        const { id } = req.params;
        const restaurant = await resturant.findById(id)
            .populate('products')
            .populate("owner", "email");
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant fetched successfully", restaurant });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get restaurants by city
const getRestaurantByCity = async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();

        const restaurants = await resturant.find({ "address.city": { $regex: new RegExp(city, 'i') } });

        res.status(200).json({ restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching restaurants by city" });
    }
}



const updateRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, description, address, location, categories, openingHours } = req.body;

        const image = req.file ? req.file.path : null;
        // Validate required fields
        if (!name || !address || !image || !location || !categories || !openingHours) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // Update restaurant
        const restaurant = await resturant.findByIdAndUpdate(restaurantId, {
            name,
            description,
            address,
            image,
            location,
            categories,
            openingHours
        }, { new: true });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant updated successfully", restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete restaurant
        const restaurant = await resturant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//changed
const incrementClickCount = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const currentDate = new Date();
        const key = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

        const updatedRestaurant = await resturant.findByIdAndUpdate(
            restaurantId,
            {
                $inc: { [`visitsByMonth.${key}`]: 1 }
            },
            { new: true, upsert: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }


        res.json(updatedRestaurant);
    } catch (error) {
        console.log("🔥 Error incrementing click count:", error);  // 🔥 Debug line
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurnatById,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantByCity,
    incrementClickCount
};