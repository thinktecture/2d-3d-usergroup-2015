var gulp = require('gulp'),
    del = require('del');

gulp.task('clean-cordova', function (cb) {
    del('cordova/www', cb);
});

gulp.task('deploy', ['clean-cordova'], function () {
    return gulp.src([
        'index.html',
        'assets/*',
        'source/*.js',
        'vendor/*.js'
    ], { base: './' })
        .pipe(gulp.dest('cordova/www'));
});