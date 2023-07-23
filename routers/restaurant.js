const {
  registerRestaurant,
  getCities,
  getRestaurantOfCity,
  getRestaurant,
  addFood,
  getFoodsOfRestaurant,
  getFoodById,
} = require('../controllers/restaurant');
const { validedUser } = require('../middleware/userValidation');
const singleUpload = require('../middleware/multer');
const checkImageUpload = require('../middleware/fileUpload');

const Router = require('express').Router;
const router = Router();

router.post('/register', validedUser, registerRestaurant);
router.get('/cities', getCities);
router.get('/:city/all', getRestaurantOfCity);
router.get('/restaurant/:restaurant_id', getRestaurant);
router.post(
  '/restaurant/add/food',
  validedUser,
  singleUpload,
  checkImageUpload,
  addFood
);
router.get('/restaurant/:restaurant_id/foods', getFoodsOfRestaurant);
router.get('/food/items/:food_id', getFoodById);

module.exports = router;
