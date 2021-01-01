const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postCodesSchema = Schema({
    postcodePrefix: {
        type: String,
        required: true
    },

    shippingCost: {
        type: Number,
        required: true
    },

    createdAt: {
        type: String
    }
})

const Postcodes = mongoose.model('Postcodes', postCodesSchema);

module.exports = Postcodes;