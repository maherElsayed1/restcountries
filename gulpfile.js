const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify');


// css task
css = () => {
    return gulp.src(['src/scss/style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

// js task
js = () => {
    return gulp.src(['src/js/jquery-3.5.1.min.js', 'src/js/bootstrap.bundle.min.js', 'src/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        // .pipe(babel({
        //     presets: ["@babel/preset-env"],
        //     plugins: ['@babel/transform-runtime']
        // }))
        // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

// watch task
watch = () => {
    gulp.watch('src/scss/**/*.scss', css);
    gulp.watch('src/js/**/*.js', js);
}

// Tasks
gulp.task('css', css);
gulp.task('js', js);
gulp.task('watch', watch);

// Default Task
gulp.task('default', gulp.series(css, js, watch));