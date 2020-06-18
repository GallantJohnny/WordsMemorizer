const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodaysWordsSchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  words: {
    type: Array,
    required: false,
    default: []
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  answeredDate: {
    type: Date,
    default: null
  }
});

module.exports = TodaysWords = mongoose.model('todaysWord', TodaysWordsSchema);