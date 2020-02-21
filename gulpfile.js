var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var merge        = require('merge-stream');
var cssnano      = require('gulp-cssnano');
var sass         = require('gulp-sass');
sass.compiler    = require('node-sass');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});

// sass

gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions'], { cascade: true }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream: true}))
});

//min

gulp.task('css-min', function() {
    return gulp.src('css/all.css')
    .pipe(cssnano())
    .pipe(gulp.dest('css/'))
});


// gulp watch
gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('sass/**/*.scss', ['sass'], browserSync.reload);
});

gulp.task('default', ['watch']);