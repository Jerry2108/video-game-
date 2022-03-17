;

/*(function (r) {
    "use strict";
    var scss = require("gulp-scss");
    var gulp = require("gulp");
    gulp.task("scss", function () {
        gulp.src(
            "./styles/*.scss"
        ).pipe(scss(
            {"bundleExec": false}
        )).pipe(gulp.dest("./public/static/css"));
    });
}(require));*/

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var sourceMaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-csso');
var autoPrefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
const { watch } = require('gulp');


//this task is to convert scss to css.
function styles(){
    return gulp.src('./styles/*.scss')
        //initialize source maps before the compilation starts
        .pipe(sourceMaps.init())
        //convert sass to pure css
        .pipe(sass().on('error', sass.logError))
        //prefixes are added
        .pipe(autoPrefixer())
        //minify css
        .pipe(minifyCss())
        //write map to a destination
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./public/static'))
        .pipe(browserSync.stream())
}

//this task is to watch any changes on scss files. 
function watchFunction() {
    //browserSync.init({server: {baseDir: './home'}});
    return gulp.watch('./styles/*.scss', styles);
}

function build(){
    return watchFunction();
}

//gulp watch will be manually run 
gulp.task('default', build);
