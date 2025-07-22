const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
    },

    price:{
        type:Number,
        required:true,
    },

    category:{
        type:String,
        required:true,
    },

    image:{
        type:String,
        required:true,
    },

    tags:[String],

    ratings:{
        avergage:{
            type:Number,
            default:0,
        },
        count:{
            type:Number,
            default:0
        }
    },

    isAvailable:{
        type:Boolean,
        default:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    discountPrice: {
    type: Number
    },

    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true
    }

})

module.exports = mongoose.model('Product',productSchema);