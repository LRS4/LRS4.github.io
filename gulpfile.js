const gulp = require('gulp');
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const concat = require('gulp-concat');
var jsonConcat = require('gulp-json-concat');
const shell = require('gulp-shell');
const babel = require('gulp-babel');
const nunjucksRender = require('gulp-nunjucks-render');
const formatHtml = require('gulp-format-html');
var data = require('gulp-data');
var fs = require('fs');

/*
 *  -- TOP LEVEL FUNCTIONS --
 *  gulp.task - Define tasks
 *  gulp.src - Point to files to use
 *  gulp.dest - Points to folder to output
 *  gulp.watch - Watch files and folders for changes 
 */

// Logs message
gulp.task('message', async () => {
    return console.log('Gulp is running...');
});

// Optimise images
gulp.task('images', async () => {
    console.log('Optimising images...')
    gulp.src('src/assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/'));
});

// Bundle, transpile and minify JS
gulp.task('scripts', async () => {
    console.log('Bundling, transpiling and minifying scripts...');
    gulp.src('src/scripts/script.js')
        .pipe(webpack( require('./webpack.config') ))
        .pipe(gulp.dest('script/'));
});

// Compile SASS and concat CSS
gulp.task('sass', async () => {
    console.log('Compiling and concatenating SASS...')
    gulp.src('src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('styles/'));
});

// Copies all HTML project files
gulp.task('html', async () => {
    console.log('Copying HTML files to projects folder...');
    gulp.src('src/projects/*.html')
        .pipe(gulp.dest('projects/'));
});

// Concatenates all JSON files
gulp.task('json', async () => {
    console.log("Concatenating JSON files...");
    gulp.src('src/data/*.json')
        .pipe(jsonConcat('db.json', function (data) {
            return new Buffer.from(JSON.stringify(data));
        }))
        .pipe(gulp.dest('src/data/dist'));
});

// Convert nunjucks files to HTML
gulp.task('nunjucks', async () => {
    console.log("Converting nunjucks files to formatted HTML...");
    gulp.src('src/pages/**/*.+(html|nunjucks)')
        .pipe(data(function (file) {
            return JSON.parse(fs.readFileSync('./src/data/dist/db.json'));
        }))
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(formatHtml())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
});

// Run UI smoke tests
gulp.task('run-tests', shell.task([
    'pytest test.py -v -s'], options = { cwd: `${process.cwd()}/tests/functional_tests` }));

// Run load testing
gulp.task('run-load-test', shell.task([
    'locust -f locustfile.py --host=http://lrs4.github.io/'], options = { cwd: `${process.cwd()}/tests/load_tests` }));

// Default task - runs all tasks for build
gulp.task('default', gulp.series('message', 'json', 'html', 'images', 'scripts', 'sass', 'nunjucks'));

// Watch task automatically runs tasks on changes
gulp.task('watch', async () => {
    gulp.watch('src/scripts/*.js', gulp.series('scripts'));
    gulp.watch('src/styles/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/*', gulp.series('images'));
    gulp.watch('src/projects/*.html', gulp.series('html'));
    gulp.watch('src/data/*json', gulp.series('json'));
    gulp.watch('src/pages/*', gulp.series('nunjucks'));
    gulp.watch('src/templates/**', gulp.series('nunjucks'));
});