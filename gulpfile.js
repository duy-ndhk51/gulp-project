const { series, src, dest , parallel,task,watch,gulp } = require('gulp');
const {exec} = require('child_process');
const {eventEmmiter} = require('events');
const fs = require('fs');
var del = require('del');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();
const merge = require('merge-stream');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');
function browsersync(){
    sync.init({
        server: './dist',
    });
    watching();
}

function sassCompile(){
    src('./sass/*.sass', {sourcemaps: true}).pipe(sass().on('error',sass.logError)).pipe(dest('./dist/css'));
}

// gulp.task('sass', ()=>{
//     return gulp.src('./sass/**/*.sass', {sourcemaps: true}).pipe(sass().on('error',sass.logError)).pipe(dest('./dist/css'));
// })

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

function copy(){
    src('html/*').pipe(dest('dist/'));
    src('css/*').pipe(dest('dist/css/'));
}

function watching(){
    const watcher = watch(['html/*','css/*','sass/*']);
    watcher.on('change',(path, stats) => {
        clean();
        copy();
        sassCompile();
        sync.reload();
    });
}
function clean(){
    del.sync(['dist/*']);
}
const firstTask = parallel(clean, build, firstTaskGulp);
exports.build = copy;
exports.default = clean;
exports.duy = copy;
exports.watch = watching;
exports.sync = browsersync;