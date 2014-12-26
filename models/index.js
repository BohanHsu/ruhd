var _ = require('underscore')

_.each(['user'], function (name) {
  var model = require('./' + name)

  module.exports[model.modelName] = model
})
