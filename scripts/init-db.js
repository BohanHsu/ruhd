module.exports = function () {

  var _  = require('underscore')
  var md5 = require('MD5')
  var q = require('q')
  var objectId = require('mongoose').Types.ObjectId

  require('../config/mongodb-connection')()

  var models = require('../models')

  //var userIds = {
  //}

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

  //return initCollection('Role', roles
  //).then(function () {
  //  return initCollection('User', superAdmins).then(function () {
  //  superAdminRoles = superAdmins.map(function (superAdmin) {
  //    return {_id: objectId(), user: superAdmin._id, role: roles.superAdmin._id}
  //  })
  //  return initCollection('UserHasRole', superAdminRoles).then(function () {

  //  })
  //}))
}
