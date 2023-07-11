const { registerRestaurant, getCities, getRestaurantOfCity, getRestaurant, addFood, getFoodsOfRestaurant, getFoodById } = require('../controllers/restaurant')
const { validedUser } = require('../middleware/userValidation')

const Router = require('express').Router
const router = Router()

router.post('/register', validedUser, registerRestaurant)
router.get('/cities', getCities)
router.get('/:city/all', getRestaurantOfCity)
router.get('/restaurant/:restaurant_id', getRestaurant);
router.post('/restaurant/add/food', validedUser, addFood);
router.get('/restaurant/:restaurant_id/foods', getFoodsOfRestaurant);
router.get('/food/items/:food_id', getFoodById);


module.exports = router