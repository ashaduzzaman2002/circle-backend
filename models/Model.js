const mongoose = require('mongoose');

// Define the food schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
}, {
    timestamps: true
});

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  profile_img: { type: String },
  slug: { type: String, required: true },
  foods: [foodSchema],
},{
    timestamps: true
});

// Define the city schema
const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  restaurants: [restaurantSchema],
},{
    timestamps: true
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'restaurant_owner'],
    default: 'restaurant_owner',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
}, {
    timestamps: true
});

// Create the models
const City = mongoose.model('City', citySchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const User = mongoose.model('User', userSchema);

module.exports = { City, Restaurant, User };
