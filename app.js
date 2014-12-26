var express = require('express')
var path = require('path')

var app = express()

require('./config/mongodb-connection')()

app.use('/vendor', express.static(path.join(__dirname, '/public/vendor')))
app.use('/js', express.static(path.join(__dirname, '/public/js')))
app.use('/css', express.static(path.join(__dirname, '/public/css')))
app.use('/img', express.static(path.join(__dirname, '/public/img')))

app.use(require('./routes'))

module.exports = app
