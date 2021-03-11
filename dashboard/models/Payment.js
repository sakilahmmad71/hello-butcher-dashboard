const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },

  price: {
    type: Number,
    required: true
  },

  createdAt: {
    type: String
  }
})

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;