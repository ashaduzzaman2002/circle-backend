const { City, Restaurant, User } = require('../models/Model');
const bcrypt = require('bcrypt')

// Register Restuarant
exports.registerRestaurant = async (req, res) => {
  const {
    cityName,
    name,
    location,
    profile_img,
    slug,
    username,
    email,
    password,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user)
      return res.json({
        success: false,
        msg: 'Restaurant allready registered',
      });

    let city = await City.findOne({ name: cityName });

    if (!city) {
      city = new City({
        name: cityName,
      });
    }

    let restaurant = city.restaurants.find((item) => item.slug === slug);

    if (restaurant) return res.json({ msg: 'Restaurant Already Register' });

    restaurant = new Restaurant({
      name,
      location,
      profile_img,
      slug,
    });

    city.restaurants.push(restaurant);

    const hashPassword = bcrypt.hashSync(password, 10)
    user = new User({
      username,
      password: hashPassword,
      email,
      restaurant: restaurant._id,
    });

    await city.save();
    await user.save();

    res.json({ success: true, msg: 'Restaurant registration successful' });
  } catch (error) {
    console.log(error);
  }
};

// Get Citis 
exports.getCities = async (req, res) => {

    try {
        const cities = await City.find({}, 'name')
        res.json({success: true, cities})
    } catch (error) {
        console.log(error);
    }
}