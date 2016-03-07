var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var clean = require('gulp-clean');

var paths = {
    html: './webapp/src/**/*.html',
    image: './webapp/src/resources/**/*.png',
    js: './webapp/src/app/**/*.js',
    sass: './webapp/src/sass/*.scss'
};

gulp.task('browserify', function() {

    return browserify('./webapp/src/app/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./webapp/dist/static'));

});

gulp.task('copyResources', function() {

    gulp.src(paths.html)
        .pipe(gulp.dest('webapp/dist'))
    gulp.src(paths.image)
        .pipe(gulp.dest('webapp/dist/static/resources'))

});

gulp.task('sass', function () {
  gulp.src('./webapp/src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./webapp/dist/static'));
});

gulp.task('watch', function() {

    gulp.watch(paths.html, ['copyResources']);
    gulp.watch(paths.image, ['copyResources']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['browserify']);

});

gulp.task('clean', function () {
	gulp.src('./webapp/dist', {read: false})
  gulp.src('./node_modules', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('default', ['watch', 'browserify', 'sass', 'copyResources']);
