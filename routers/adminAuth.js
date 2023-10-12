const { Router } = require('express')
const { register, login } = require('../controllers/adminAuth')
const { body } = require("express-validator")
const { AdminLoginInputValidation, AdminCreateUserInputValidation } = require('../middleware/inputValidation')
const router = Router()

router.post('/createUser', AdminCreateUserInputValidation, register)
router.post('/login', AdminLoginInputValidation, login)

module.exports = router