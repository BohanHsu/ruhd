var _ = require('undersore')

_.each(['env', 'mongodb-connection'], function (ele) {
  var model = require('./' + ele)

  module.exports[model.modelName] = model
})
