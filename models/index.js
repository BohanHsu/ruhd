var _ = require('underscore')

_.each(['user', 'role', 'user-has-role'], function (name) {
  var model = require('./' + name)

  module.exports[model.modelName] = model
})
