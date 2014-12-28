var gulp = require('gulp')
var jshint = require('gulp-jshint')

var paths = {
  server: {
    scripts: [
      'app.js',
      'server.js',
      'routes/**/*.js'
    ]
  }
}

gulp.task('lint', function () {
  gulp
    .src(paths.server.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
})

gulp.task('dropdb', function () {
  var mongoose = require('mongoose')
  require('./config/mongodb-connection')().then(function () {
    mongoose.connection.db.dropDatabase()
    mongoose.disconnect()
    console.log('database droped')
  })
})

gulp.task('initdb', function () {
  require('./scripts/init-db')().then(function () {
    require('mongoose').disconnect()
  })
})
