var gulp = require('gulp'),
watch = require('gulp-watch'),
del = require('del'),
bundle = require('gulp-bundle-assets');

gulp.task('clean_directory',function(){
    return del(['build/**/*']);
});

gulp.task('bundle',function() {
    return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle:watch',function(){
    gulp.watch('./src/**/*', ['clean_directory','bundle']);
});

gulp.task('default',['clean_directory','bundle','bundle:watch'],function(){});