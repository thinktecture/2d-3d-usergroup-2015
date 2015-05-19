/// <reference path="typings/tsd.d.ts" />

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
    del = require('del'),
    merge = require('merge2');
   
var sourceFolder = 'source';
var distFolder = 'dist'; 
   
var tsProject = ts.createProject({
    declarationFiles: true,
    target: 'ES5'
});
   
gulp.task('clean', function (cb) {
    del([distFolder], cb);
});

gulp.task('default', ['clean'], function () {
    var tsResult = gulp.src(sourceFolder + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
        
    return merge([
        tsResult.dts
            .pipe(concat('definitions.js'))
            .pipe(gulp.dest(distFolder)),
        tsResult.js
            .pipe(concat('lib.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(distFolder))
    ]);
});

gulp.task('clean-cordova', function (cb) {
    del('cordova/www', cb);
});

gulp.task('deploy', ['clean', 'clean-cordova', 'default'], function () {
    return gulp.src([
        'index.html',
        'examples.html',
        'dist/*.js',
        'vendor/*.js'
    ], { base: './' })
        .pipe(gulp.dest('cordova/www'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(sourceFolder + '/**/*.ts', ['default']);
});