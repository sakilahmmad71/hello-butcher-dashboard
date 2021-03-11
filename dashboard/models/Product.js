const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {
        type: String,
    },

    category: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    file: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
    },

    weight: {
        type: String,
    },

    discount: {
        type: String,
    },

    options: {
        type: Array
    },

    skin: {
        type: String,
    },

    fat: {
        type: String,
    },

    smallcut: {
        type: String,
    },

    mediumcut: {
        type: String,
    },

    bigcut: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
