const { registerRestaurant, getCities } = require('../controllers/restaurant')

const Router = require('express').Router
const router = Router()

router.post('/register', registerRestaurant)
router.get('/cities', getCities)


module.exports = router