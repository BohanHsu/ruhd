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
