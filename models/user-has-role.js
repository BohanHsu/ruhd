var mongoose = require('mongoose')
var objectId = mongoose.Schema.Types.ObjectId

var UserHasRoleSchema = new mongoose.Schema({
  user: {
    type: objectId,
    ref: 'User',
    required: true
  },
  role: {
    type: objectId,
    ref: 'Role',
    required: true
  }
})

module.exports = mongoose.model('UserHasRole', UserHasRoleSchema)
