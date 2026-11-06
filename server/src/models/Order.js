const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  catererId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caterer',
    required: true,
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  eventDate: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
