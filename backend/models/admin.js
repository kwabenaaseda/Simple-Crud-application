const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: 'admin@2020242914' // Default password for admin
    }
}, { timestamps: true });     
module.exports = mongoose.model('Admin', AdminSchema);