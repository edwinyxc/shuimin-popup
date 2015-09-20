var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('uglify', function(){
    gulp.src('./src/shuimin-popup.js')
        .pipe(uglify())
        .pipe(rename('index.js'))
        .pipe((gulp.dest('./')));
});

gulp.task('default', function(){
    gulp.watch('./src/shuimin-popup.js', function(e){
        gulp.run('uglify')
    })
});
