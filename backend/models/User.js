const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    usermail:{
        type: String,
        required: true,
        unique: true
    },
    userpassword:{
        type: String,
        required: true,
    }
},{timestamps: true});
module.exports = mongoose.model('User', userSchema, 'users'); // 'users' is the collection name in MongoDB
