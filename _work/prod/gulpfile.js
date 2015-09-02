var gulp = require('gulp');
var gulpif = require('gulp-if');
var run = require('gulp-run');
var useref = require('gulp-useref');
var del = require('del');
var minifyHTML = require('gulp-minify-html');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var src = '../../src/';
var server = src + 'server/';
var serverConfig = server + 'lib/';
var serverFile = server + 'template.js';
var client = src + 'client/';
var app = client + 'app/';
var assets = client + 'assets/';
var index = client + 'index.html';
var dist = 'dist/';
var distClient = dist + 'client/';
var distApp = distClient + 'app/';
var distAssets = distClient + 'assets/';
var distServer = dist + 'server/';
var distServerConfig = distServer + 'lib/';

gulp.task('del-dist', function () {
    del(dist, {
        force: true
    })
});

gulp.task('parse-index', function () {
    var assets = useref.assets();
    return gulp.src(index)
        .pipe(assets)
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(distClient));
});

gulp.task('move-html', function () {
    var opts = {
        empty: true
    };
    return gulp.src(app + '/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(distApp));
});

gulp.task('move-assets', function () {
    return gulp.src(assets + '/**/*.*')
        .pipe(gulp.dest(distAssets));
});

gulp.task('move-server', function () {
    return gulp.src([serverFile, server + 'package.json'])
        .pipe(gulp.dest(distServer));
});

gulp.task('move-server-config', function () {
    return gulp.src(serverConfig + '/**/*.js')
        .pipe(gulp.dest(distServerConfig));
});

gulp.task('build-dist', ['parse-index', 'move-html', 'move-assets', 'move-server', 'move-server-config'], function () {
    console.log('Building distribution... Ready');
})