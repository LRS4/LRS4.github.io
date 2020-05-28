const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const concat = require('gulp-concat');

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

// Concat and minify JS
gulp.task('scripts', async () => {
    console.log('Concatenating and minifying scripts...');
    gulp.src('src/scripts/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('script/'));
});

// Compile SASS
gulp.task('sass', async () => {
    console.log('Compiling SASS...')
    gulp.src('src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(gulp.dest('styles/'));
});

// Copies all HTML files
gulp.task('html', async () => {
    console.log('Copying HTML files to dist folder...');
    gulp.src('src/projects/*.html')
        .pipe(gulp.dest('projects/'));
});

// Default task - runs all tasks for build
gulp.task('default', gulp.series('message', 'html', 'images', 'scripts', 'sass'));