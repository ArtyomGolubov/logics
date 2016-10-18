/// <binding BeforeBuild='less' AfterBuild='less' Clean='less' ProjectOpened='less' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    less = require("gulp-less"); // добавляем модуль less

var paths = {
    webroot: "./wwwroot/"
};
//  регистрируем задачу по преобразованию styles.less в файл css
gulp.task("less", function () {
    return gulp.src('css/main.less')
            .pipe(less())
            .pipe(gulp.dest(paths.webroot + '/css'))
});

var paths2 = {
    webroot: "./css/"
};

//  регистрируем задачу по преобразованию styles.less в файл css
gulp.task("less", function () {
    return gulp.src('css/ttt.less')
            .pipe(less())
            .pipe(gulp.dest(paths2.webroot))
});