# Portfolio Website

## Overview

This site gives an overview of skills, experience and qualifications achieved. It also serves as a record of learning and development through projects worked on and completed. Built as a static site and deployed via GitHub Pages.

## Tools used

* HTML, CSS
* JavaScript, jQuery
* Node.js
* Gulp Task Runner
* AJAX, APIs
* Python, Pytest, Locust

## Dependencies

* Ensure [Node.js and npm](https://nodejs.org/en/download/) are installed
* Use `npm install` to install dependencies
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify-es)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-shell](https://www.npmjs.com/package/gulp-shell)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)

## Tasks

* Use `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to avoid PowerShell errors
* Use `gulp` to run all build tasks
* Use `gulp watch` for to watch for changes
* Minification of scripts, styles and images
* Script concatenation 
* Script uglification
* Script transpilation from ES6
* Automated tests
* [Gulp](https://gulpjs.com/)
* [Nunjucks](https://zellwk.com/blog/nunjucks-with-gulp/)

## Testing

* Download [ChromeDriver](https://chromedriver.chromium.org/downloads) and place in `C:\` directory
* Ensure [Python](https://www.python.org/downloads/) is installed
* Use `pip install -r requirements.txt` to install packages
* Use `gulp run-tests` to start automated testing
* Use `gulp run-load-tests` to start Locust running at http://localhost:8090
* [pytest](https://docs.pytest.org/en/latest/)
* [locust](https://docs.locust.io/en/stable/)

## References

* [jQuery](https://jquery.com/)
* [Combining JS Files](https://stackoverflow.com/questions/8410298/one-js-file-for-multiple-pages)
* [Setting PS Execution Policy](https://medium.com/@caiomsouza/fix-for-powershell-script-not-digitally-signed-69f0ed518715)
* [Changing PS Executing Policy](https://stackoverflow.com/questions/57673913/vsc-powershell-after-npm-updating-packages-ps1-cannot-be-loaded-because-runnin)
* [Running tasks in series](https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md)

## NPM commands used

```
npm install -g gulp
npm install --save-dev gulp
```
