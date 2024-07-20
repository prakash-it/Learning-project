const express = require('express')
const { signup } = require('../controller/authcontroller')
const router = express.Router()

router.post('/signup', signup)



module.exports = router