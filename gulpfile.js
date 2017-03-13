var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();


    gulp.task('sass', function() {
        return gulp.src('./src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./public/stylesheets'))
            .pipe(bs.stream());
    })

    gulp.task('serve', ['sass'],function() {

        bs.init({
            proxy: "http://localhost:3000"
        });

        gulp.watch('./src/sass/**/*.*', ['sass']);
        gulp.watch('./views/**/*.pug').on('change', bs.reload);
    })

    gulp.task('default', ['serve'],function() {

    })