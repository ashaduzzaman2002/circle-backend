const { registerRestaurant, getCities, getRestaurantOfCity, getRestaurant } = require('../controllers/restaurant')

const Router = require('express').Router
const router = Router()

router.post('/register', registerRestaurant)
router.get('/cities', getCities)
router.get('/:city/all', getRestaurantOfCity)
router.get('/:city/:restaurantname', getRestaurant)


module.exports = router