const express = require('express')
const { signup, signin } = require('../controller/authcontroller')
const router = express.Router()

router.post('/signup', signup)
router.get('/signin',signin)


module.exports = router