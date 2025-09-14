const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Restaurant image storage
const restaurantStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "restaurants",   // 👈 Goes inside restaurants folder
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// Product image storage
const productStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",   // 👈 Goes inside products folder
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const uploadRestaurant = multer({ storage: restaurantStorage });
const uploadProduct = multer({ storage: productStorage });

module.exports = { uploadRestaurant, uploadProduct };
