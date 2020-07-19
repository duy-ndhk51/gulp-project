const { series, src, dest , parallel,task } = require('gulp');
const gulp = require('gulp');
const {exec} = require('child_process');
const {eventEmmiter} = require('events');
const fs = require('fs');
var del = require('del');


function streamTask(){
    return src('*/js').pipe(dest('dist'));
}

function firstTaskGulp(cb){
    process.stdout.write('First task gulp function');
    try {
        cb(new Error('an error occured !'));
    } catch(err) {
        console.log('something is happened ! ', err);
    }
}
function build(cb){
    process.stdout.write('build function');
    console.log('build function');
    cb();
}

function copy(cb){
    src('html/aboutus.html').pipe(dest('dist/'));
}

function clean(cb){
    del.sync(['dist/*']);
}
const firstTask = parallel(clean, build, firstTaskGulp);
exports.build = copy;
exports.default = clean;
exports.duy = copy;