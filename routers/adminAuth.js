const { Router } = require('express')
const { register, login } = require('../controllers/adminAuth')

const router = Router()

router.post('/createUser', register)
router.post('/login', login)

module.exports = router