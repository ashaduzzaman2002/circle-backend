const mongoose = require('mongoose');

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    city:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },

    profile_img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);