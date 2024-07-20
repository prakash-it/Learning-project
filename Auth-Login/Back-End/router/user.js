const express = require('express')
const { test } = require('../controller/usercontroller')

const router= express.Router()

router.get('/',test)
 

module.exports = router