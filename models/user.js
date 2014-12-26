var mongoose = require('mongoose')
var uuid = require('node-uuid')
var UserHasRole = require('./user-has-role')
//var q = require('q')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    default: uuid.v4
  }
})

UserSchema.static('rolesOfUser')

module.exports = mongoose.model('User', UserSchema)
