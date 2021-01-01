const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = Schema({
    platform: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    createdAt: {
        type: String,
    },
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;