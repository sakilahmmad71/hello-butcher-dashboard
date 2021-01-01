const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    code: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },

    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },

    status: {
        type: String,
        default: "requested"
    },

    createdAt: {
        type: String,
    },

    shippingCost: {
        type: String
    },

    subTotal: {
        type: String,
    },

    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            options: { type: Object },
            quantity: { type: String },
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;