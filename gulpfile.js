const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const shell = require('gulp-shell');
const babel = require('gulp-babel');

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

// Concat, transpile and minify JS
gulp.task('scripts', async () => {
    console.log('Concatenating, transpiling and minifying scripts...');
    gulp.src('src/scripts/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('script/'));
});

// Compile SASS and concat CSS
gulp.task('sass', async () => {
    console.log('Compiling and concatenating SASS...')
    gulp.src('src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'})
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

// Run UI smoke tests
gulp.task('run-tests', shell.task([
    'pytest test.py -v -s'], options = { cwd: `${process.cwd()}/tests/functional_tests`}));

// Run load testing
gulp.task('run-load-test', shell.task([
    'locust -f locustfile.py --host=http://lrs4.github.io/'], options = { cwd: `${process.cwd()}/tests/load_tests`}));

// Default task - runs all tasks for build
gulp.task('default', gulp.series('message', 'html', 'images', 'scripts', 'sass'));

// Watch task automatically runs tasks on changes
gulp.task('watch', async () => {
    gulp.watch('src/scripts/*.js', gulp.series('scripts'));
    gulp.watch('src/styles/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/*', gulp.series('images'));
    gulp.watch('src/projects/*.html', gulp.series('html'));
});