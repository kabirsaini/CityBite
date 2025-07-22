const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');


const upload = require('../middlewares/uploadResMiddleware');


const { createRestaurant, getAllRestaurants,
    getRestaurnatById, getRestaurantByCity, updateRestaurant, deleteRestaurant, incrementClickCount } = require('../controller/restaurantController');

const { isAuthenticated, restrictTo } = require('../middlewares/auth');


// Create a new restaurant
router.post(
    '/',
    isAuthenticated,
    restrictTo("vendor"),
    upload.single('image'), // ✅ must be here
    createRestaurant
);

// Get all restaurants
router.get('/', isAuthenticated, getAllRestaurants);

// Get a restaurant by ID
router.get('/my', isAuthenticated, restrictTo("vendor"), async (req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ restaurant });
});
router.get('/:id', isAuthenticated, getRestaurnatById);

router.get('/city/:city', getRestaurantByCity);


// Update a restaurant
router.put('/:restaurantId', isAuthenticated,upload.single('image'), restrictTo("vendor"), updateRestaurant);

// Delete a restaurant
router.delete('/:id', isAuthenticated, restrictTo("vendor"), deleteRestaurant);


//changed
router.put('/click/:id', incrementClickCount);

module.exports = router;