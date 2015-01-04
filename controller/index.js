var express = require('express')
var router = express.Router()

router.use('/', require('./app'))

module.exports = router
