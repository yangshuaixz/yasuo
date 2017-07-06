var gulp = require('gulp'),
//npm install gulp -g   (global环境)
//npm install gulp --save-dev (项目环境)
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    //npm install gulp-minify-css gulp-concat gulp-uglify gulp-rename del --save-dev
    imagemin=require('gulp-imagemin'),//压缩图片  npm install gulp-imagemin
    htmlmin = require('gulp-htmlmin');//npm install gulp-htmlmin –save-dev


//压缩css和js输入gulp
//压缩css
gulp.task('minifycss', function() {
    return gulp.src('css/*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('minified/css'));   //输出文件夹
});
//压缩js
gulp.task('minifyjs', function() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});
// 压缩图片gulp images
gulp.task('images', function () {
    gulp.src('images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('minified/images'));
});
//压缩html输入gulp testHtmlmin
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('minified'));
});
gulp.task('default', function() {
    gulp.start('minifycss', 'minifyjs');
});
