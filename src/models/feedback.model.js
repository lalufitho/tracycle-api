const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
    nama: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

Feedback = mongoose.model('feedback', FeedbackSchema)

module.exports = Feedback