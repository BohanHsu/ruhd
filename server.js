#!/bin/env node

var app = require('./app')

app.listen(3000, function () {
  console.log('server start!')
})
