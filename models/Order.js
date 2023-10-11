const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },

  customerNumber: {
    type: Number,
    required: true,
  },

  tableNo: {
    type: String,
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },

  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
      },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  // Other order details

  status: {
    type: String,
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
