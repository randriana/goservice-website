var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();


    gulp.task('sass', function() {
        return gulp.src('./src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer())
            .pipe(gulp.dest('./public/stylesheets'))
            .pipe(bs.stream());
    })

    gulp.task('js-watch', function() {
        bs.reload();
    })

    gulp.task('serve', ['sass'],function() {

        bs.init({
            proxy: "http://localhost:3000"
        });

        gulp.watch('./src/sass/**/*.*', ['sass']);
        gulp.watch('./public/javascripts/*.js', ['js-watch']);
        gulp.watch('./views/**/*.pug').on('change', bs.reload);
    })

    gulp.task('default', ['serve'],function() {

    })
