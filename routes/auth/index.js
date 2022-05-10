const express = require('express')
const router = express.Router()
const authController = require('../../controller/authController')
const verifyToken=require('../../middleware/auth')

router.get('/checkLogin',verifyToken,authController.checkLogin )
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router