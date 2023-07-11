const { getUser, logout, login } = require('../controllers/auth')
const {validedUser} = require('../middleware/userValidation')

const Router = require('express').Router
const router = Router()

router.post('/login', login)
router.get('/user', validedUser, getUser)
router.get('/logout', validedUser, logout)

module.exports = router