var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var clean = require('gulp-clean');

var paths = {
    html: './webapp/src/index.html',
    tpl: './webapp/src/app/**/*.tpl.html',
    image: './webapp/src/resources/**/*.png',
    js: './webapp/src/app/**/*.js',
    sass: './webapp/src/sass/*.scss'
};

gulp.task('browserify', function() {

    browserify('./webapp/src/app/app.js',{
        paths: ['./node_modules', './webapp/src/app']
    })
        .bundle()
        .on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./webapp/dist/static'));

});

gulp.task('copyResources', function() {

    gulp.src(paths.html)
        .pipe(gulp.dest('webapp/dist'))
    gulp.src(paths.tpl)
        .pipe(gulp.dest('webapp/dist/templates'))
    gulp.src(paths.image)
        .pipe(gulp.dest('webapp/dist/static/resources'))

});

gulp.task('sass', function () {
  gulp.src('./webapp/src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./webapp/dist/static'));
});

gulp.task('watch', ['build'], function() {

    gulp.watch(paths.html, ['copyResources']);
    gulp.watch(paths.tpl, ['copyResources']);
    gulp.watch(paths.image, ['copyResources']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['browserify']);

});

gulp.task('clean', function () {
	gulp.src('./webapp/dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('build', ['browserify', 'sass', 'copyResources']);

gulp.task('default', ['build']);
