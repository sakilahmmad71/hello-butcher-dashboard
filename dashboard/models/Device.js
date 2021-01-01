const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },

    platform: {
        type: String,
        required: true,
    },

    appVersion: {
        type: String
    },

    brand: {
        type: String
    },

    udid: {
        type: String,
        required: true,
    },

    pushid: {
        type: String,
        required: true,
    },

    createdAt: {
        type: String
    }
})

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;