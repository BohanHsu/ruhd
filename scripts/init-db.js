module.exports = function () {

  var _  = require('underscore')
  var md5 = require('MD5')
  var q = require('q')
  var objectId = require('mongoose').Types.ObjectId

  require('../config/mongodb-connection')()

  var models = require('../models')

  var roles = {
    superAdmin: {_id: objectId(), name: 'super_admin'},
    admin: {_id: objectId(), name: 'admin'},
  }

  var superAdmins = [
    {_id: objectId(), email: 'super_admin@test.com', password: md5('password')}
  ]

  var admins = [
    {_id: objectId(), email: 'admin@test.com', password: md5('password')},
    {_id: objectId(), email: 'test@test.com', password: md5('password')}
  ]

  var userHasRoles = _.map(superAdmins, function (user) {
    return {user: user, role: roles.superAdmin}
  }).concat(_.map(admins, function (user) {
    return {user: user, role: roles.admin}
  }))

  return initCollection('Role', [
    roles.superAdmin, roles.admin
  ]).then(function () {
    return initCollection('User', superAdmins.concat(admins))
  }).then(function () {
    return initCollection('UserHasRole', userHasRoles)
  }).then(function () {
    console.log('success')
  }).fail(function (err) {
    console.log('error' + err)
  })

  function initCollection (name, collection) {
    var deferred = q.defer()
    models[name].remove({}, function () {
      var promises = _.map(collection, function (document) {
        if (_.isFunction(document)) {
          return document()
        } else {
          return models[name].create(document)
        }
      })

      q.all(promises).then(function () {
        deferred.resolve()
      }, function (err) {
        deferred.reject('Unable to init collection: ' + name + ', error:' + err.message)
      })
    })
    return deferred.promise
  }
}
