const express = require('express')
const { checkout, paymentVerification } = require('../controllers/paymentController')


const router = express.Router()

router.post('/checkout', checkout)
router.post('/verification', paymentVerification)


module.exports = router