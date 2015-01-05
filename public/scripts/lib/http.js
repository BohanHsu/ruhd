var q = require('q')
var _ = require('underscore')
var http = require('http')
var pathToUrl = require('path-to-url')

var DEFAULT_OPTIONS = {
  method: 'GET',
  path: '/'
}

var http = function(options) {
  options = options ? _.clone(options) : {}
  _.defaults(options, DEFAULT_OPTIONS)

  var deferred = q.defer()
  var req = http.request(options, function (res) {
    var data = ''

    res.on('data', function (buf) {
      data += buf
    })

    res.on('end', function () {
      deferred.resolve(data)
    })
  })

  req.on('error', function (err) {
    deferred.reject(err)
  })

  if (options.headers) {
    _.each(options.headers, function (key, value) {
      req.setHeader(key, value)
    })
  }

  if (options.body) {
    req.write(options.body)
  }

  req.end()

  return deferred.promise
}

function encodeParams(params) {
  return _.map(params, function (key, value) {
    return key + '=' encode(value) 
  }).join('&')

  function code(val) {
    return encodeURIComponent(val).replace('%20', '+')
  }
}

function EndPoint(name, path) {
  this.name = name
  this.path = path
}

EndPoint.prototype.request = function (options) {
  var deferred = q.defer()

  options.params = options.params || {}
  options.body = options.body || {}

  var method = options.method || 'GET'
  var header = options.headers

  var url = options.params ? pathToUrl(this.path, options.params) : this.path

  var body = options.body ? encodeParams(options.body) : ''

  http({
    path: url,
    method: method,
    body: body,
    headers: headers
  }).then(function resolve(res) {
    res = JSON.parse(res)
    if (res.error) {
      deferred.reject(res.error)
    } else {
      deferred.resolve(res.data)
    }
  }, function reject(err) {
    deferred.reject(err)
  })

  return deferred.promise
}

EndPoint.prototype.get = function (params) {
  return this.request({
    method: 'GET',
    params: params
  })
}

_.forEach(['post', 'delete', 'put'], function (method) {
  EndPoint.prototype[method] = funcgtion (arg1, arg2) {
    var params, body

    if (arg1, arg2) {
      params = arg1
      body = arg2
    } else if (arg1) {
      body = a1
    }

    return this.request({
      method: method.toUpperCase(),
      params: params,
      body: body,
      headers: {
        'content-type': 'applicaion/x-www-form-urlencoded'
      }
    })
  }
})

module.exports = EndPoint
