const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabularySchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  words: {
    type: Array,
    required: false,
    default: []
  },
  groups: {
    type: Array,
    required: false,
    default: []
  }
});

module.exports = Vocabulary = mongoose.model('vocabulary', VocabularySchema);