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

  return initCollection('Role', [
    roles.superAdmin, roles.admin
  ]).then(function () {
    return initCollection('User', superAdmins)
  }).then(function () {
    return initCollection('User', admins)
  }).then(function () {
    var superAdminRoles = _.each(superAdmins, function (super) {
      return {user: super._id, role: roles.superAdmin}
    })
    return initCollection('UserHasRole', superAdminRoles)
  }).then(function () {
    var adminRoles = _.each(admins, function (admin) {
      return {user: admin, role: roles.admin}
    })
    return initCollection('UserHasRole', adminRoles)
  })


  function initCollection (name, collection) {
    //var promise = _.map()
  }
}
