const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    phone: {
        type: String,
        // required: true,
        // unique: true, due to google login
    },

    password: {
        type: String,
        // required: true, due to google login
    },

    address: {
        street: { type: String, required: false },     // e.g., "123 Main Street"
        city: { type: String, required: false },     // e.g., "Ludhiana"
        state: { type: String, required: false },     // e.g., "Punjab"
        pincode: { type: String },                     // optional but useful
    },

    role:
    {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user',
        required: true,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]

})


module.exports = mongoose.model('User', userSchema);
