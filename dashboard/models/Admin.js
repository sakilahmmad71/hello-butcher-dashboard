const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    role: {
        type: String,
        default: 'admin',
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
        default: Date.now(),
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
