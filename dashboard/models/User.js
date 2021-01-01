const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: {
        type: String,
        default: 'user',
    },
    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    phone: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    active: {
        type: String,
        default: "active"
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
