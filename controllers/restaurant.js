const bcrypt = require("bcrypt");
const User = require("../models/User");
const City = require("../models/City");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");
const dataURI = require("../utils/dataUri");
const cloudinary = require("cloudinary");
const Order = require("../models/Order");

exports.getAllItem = async (req, res) => {
  try {
    const items = await Food.find();

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurantById = async (req, res) => {
  let id = req.params?.id;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res
        .status(404)
        .json({ sucess: false, msg: "Restaurant not found" });
    res.json({ success: true, restaurant });
  } catch (error) {
    console.log(error);
    res.status(404).json({ sucess: false, msg: "Restaurant not found" });
  }
};

exports.getMenuOfARestaurant = async (req, res) => {
  let id = req.params?.id;

  try {
    const items = await Food.find({ restaurant: id });

    res.json({ success: true, items });
  } catch (error) {
    console.log(error);
  }
};

// Register Restuarant
exports.registerRestaurant = async (req, res) => {
  const { cityName, name, location, profile_img, username, email, password } =
    req.body;

  const userId = req.userId;

  try {
    const admin = await User.findById(userId);

    if (!admin || admin.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access!" });
    }

    const lowerCaseCityName = cityName.toLowerCase();
    let user = await User.findOne({ email });

    if (user)
      return res.json({
        success: false,
        msg: "Restaurant allready registered",
      });

    let city = await City.findOne({ name: lowerCaseCityName });

    if (!city) {
      city = new City({
        name: lowerCaseCityName,
      });
    }

    let restaurant = new Restaurant({
      name,
      location,
      profile_img,
      city: city._id,
    });

    const hashPassword = bcrypt.hashSync(password, 10);
    user = new User({
      username,
      password: hashPassword,
      email,
      restaurant: restaurant._id,
    });

    await city.save();
    await user.save();
    await restaurant.save();

    res.json({ success: true, msg: "Restaurant registration successful" });
  } catch (error) {
    console.log(error);
  }
};

// Get Citis
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({}, "name");
    res.json({ success: true, cities });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurantOfCity = async (req, res) => {
  let cityname = req.params?.city;
  cityname = cityname?.toLowerCase();

  try {
    let city = await City.findOne({ name: cityname });

    if (!city)
      return res.json({
        success: false,
        msg: "No restaurant found in your city!",
      });

    const restaurants = await Restaurant.find({ city: city._id });
    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error);
  }
};

exports.getRestaurant = async (req, res) => {
  let restaurant_id = req.params?.restaurant_id;

  try {
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant)
      return res.json({ success: false, msg: "No restaurant found" });
    res.json({ success: true, restaurant });
  } catch (error) {
    console.log(error);
  }
};

// add food
exports.addFood = async (req, res) => {
  const userId = req.userId;
  const { name, desc, img, price, type, category } = req.body;

  const file = req.file;

  // return console.log(name)

  try {
    const user = await User.findById(userId);

    if (!user || user.role !== "restaurant_owner") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access!" });
    }

    const restaurant = await Restaurant.findById(user.restaurant);
    if (!restaurant)
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access! 2" });

    const fileUri = dataURI(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const food = new Food({
      restaurant: restaurant._id,
      name,
      desc,
      img: mycloud.secure_url,
      price,
      type,
      category,
    });

    await food.save();

    res.json({ success: true, msg: "Food added successfully", food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succcess: false, msg: "1 Internal server error" });
  }
};

exports.getFoodsOfRestaurant = async (req, res) => {
  const restaurant_id = req.params?.restaurant_id;

  try {
    const foods = await Food.find({ restaurant: restaurant_id });

    if (!foods)
      return res.status(404).json({ success: false, msg: "No items found" });

    res.json({ succcess: true, foods: foods.reverse() });
  } catch (error) {}
};

exports.getFoodById = async (req, res) => {
  const food_id = req.params?.food_id;

  try {
    const food = await Food.findById(food_id);

    if (!food)
      return res.status(404).json({ success: false, msg: "Item not found" });

    res.json({ success: true, food });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const userId = req.userId;
  const { food_id } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.role !== "restaurant_owner") {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access!" });
    }

    let food = await Food.findById(food_id);

    if (!food) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    food = await Food.findByIdAndDelete(food_id);

    res.json({ success: true, msg: "Item deleted successfully" });

    console.log(food);
  } catch (error) {
    console.log(error);
    res.status(500).json({ succcess: false, msg: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  const userId = req.userId;

  try {
    const order = await Order.find();

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
};
