process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var env = exports
env.is = {
  not: {}
}

env.is[process.env.NODE_ENV] = true
env.is.not[process.env.NODE_ENV] = false

env.MONGO_DB_URL = 'mongodb://admin:1234@127.0.0.1:27017/'
env.APP_NAME = 'ruhd'

env.MONGO_DB_CONN_STR = env.MONGO_DB_RUL + env.APP_NAME
