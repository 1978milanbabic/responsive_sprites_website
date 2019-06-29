const gulp = require('gulp');
//css
const prefix = require('gulp-autoprefixer');
const cssMin = require('gulp-css');
//js
const uglify = require('gulp-uglify');
//imgs
const imagemin = require('gulp-imagemin');


//**** CSS TASKS *****
//after vscode sass compiler - prefix, minimize and put to production
gulp.task('css', () => {
    gulp.src('./FE-Development/css/**/*.css')
        .pipe(prefix('last 100 versions'))
        .pipe(cssMin())
        .pipe(gulp.dest('./public/stylesheets/'));
});

//watch .css for changes (on save)
gulp.task('css:watch', () => {
    gulp.watch('./FE-Development/css/**/*.css', ['css']);
});

//**** JS TASKS *****
gulp.task('uglifyJS', () => {
    gulp.src([
        './FE-Development/js/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts/'));
});

//just copy
gulp.task('copyJS', () => {
    gulp.src([
        './FE-Development/js/*.js'
    ])
        .pipe(gulp.dest('./public/javascripts/'));
});

//watch js for changes
gulp.task('js:watch', () => {
    gulp.watch('./FE-Development/js/**/*.js', ['uglifyJS']);//, ['copyJS']
});

//**** IMG TASKS *****
gulp.task('imgMin', () => {
    gulp.src([
        './FE-Development/img/**/*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images/'));
});

//*********************** DEPLOYING TO PRODUCTION ***************************

gulp.task('default', ['css:watch', 'js:watch']);