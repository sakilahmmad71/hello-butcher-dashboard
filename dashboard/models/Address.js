const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },

    createdAt: {
        type: String
    },

    houseNo: {
        type: String,
        required: true
    },

    apartmentName: {
        type: String,
        required: true
    },

    streetName: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    postcodePrefix: {
        type: String,
        required: true
    },

    postcodeSuffix: {
        type: String,
        required: true
    },

    shippingCost: {
        type: String,
    },
})

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;