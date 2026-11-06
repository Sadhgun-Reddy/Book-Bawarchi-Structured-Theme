const mongoose = require('mongoose');

const catererSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
  }],
  specialty: {
    type: String,
  },
  description: {
    type: String,
  },
  dietary: [{
    type: String,
  }],
  priceValue: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  isTopRated: {
    type: Boolean,
    default: false,
  },
  dateCode: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Caterer', catererSchema);
