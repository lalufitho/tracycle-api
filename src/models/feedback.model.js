const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
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
  },
});

const Feedback = mongoose.model('feedback', FeedbackSchema);

module.exports = Feedback;
