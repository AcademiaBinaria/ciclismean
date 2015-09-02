var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var src = '../../src/';
var server = 'server/';
var serverFile = server + 'ciclismean.js';
var client = 'client/';

gulp.task('start-nodemon', function () {
    nodemon({
        verbose: false,
        cwd: src,
        script: serverFile,
        watch: [server]
    }).on('restart', function () {
        console.log('App restarted.');
    })
})

gulp.task('default', ['start-nodemon']);