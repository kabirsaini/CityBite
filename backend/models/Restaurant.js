const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    address: {
        street: { type: String, required: true },     // e.g., "123 Main Street"
        city: { type: String, required: true },     // e.g., "Ludhiana"
        state: { type: String, required: true },     // e.g., "Punjab"
        pincode: { type: String },                     // optional but useful
    },

    image: {
        type: String,
        required: true,
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    categories: {
        type: [String],
        required: true,
    },

    openingHours: {
        openingTime: {
            type: String,
            required: true,
        },
        closingTime: {
            type: String,
            required: true,
        }
    },

    ratings: {
        average: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0
        }
    },

    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    gsti: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    phone: {
        type: String,
        required: true,
    },

    visitsByMonth: {
        type: Map,
        of: Number,
        default: {}
    },

    products: [
        // This is a reference to the Product model
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]



});

restaurantSchema.index({ location: "2dsphere" }); // ✅ Geo index
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;