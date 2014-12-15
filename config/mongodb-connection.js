var q = require('q')
//var env = require()

//var connected = false

module.exports = function () {
  var deferred = q.defer()

  if (connected) {
    defered.resolve()
    return deferred.promise
  }

  var mongoose = require('mongoose')

  mongoose.connect(, {auth: {authdb: 'admin'}})
}
