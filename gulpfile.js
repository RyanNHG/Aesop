var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

var paths = {
    html: './webapp/src/**/*.html',
    js: './webapp/src/app/**/*.js',
    sass: './webapp/src/sass/*.scss'
};

gulp.task('browserify', function() {

    return browserify('./webapp/src/app/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./webapp/dist/static'));

});

gulp.task('copyHTML', function() {

    gulp.src(paths.html)
        .pipe(gulp.dest('webapp/dist'))

});

gulp.task('sass', function () {
  gulp.src('./webapp/src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./webapp/dist/static'));
});

gulp.task('watch', function() {

    gulp.watch(paths.html, ['copyHTML']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['browserify']);

});

gulp.task('default', ['watch', 'browserify', 'sass', 'copyHTML']);