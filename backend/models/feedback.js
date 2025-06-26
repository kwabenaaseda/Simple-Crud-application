const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    userLocation: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
    }

},{timestamps: true});

module.exports = mongoose.model("Feedback", FeedbackSchema);