var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var less = require('gulp-less');
var gif = require('gulp-if');
var ts = require('gulp-typescript');

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isScssFile(file) {
  return stringEndsWith(file.relative, 'scss');
}

function isLessFile(file) {
  return stringEndsWith(file.relative, 'less');
}

function isTypeScriptFile(file) {
    return stringEndsWith(file.relative,'ts');
}

var styleTransforms = lazypipe()
  .pipe(function() {
    return gif(isScssFile, sass());
  })
  .pipe(function() {
    return gif(isLessFile, less());
  });

var scriptTransforms = lazypipe()
  .pipe(function(){
      return gif(isTypeScriptFile, ts());
  });

module.exports = {
    bundle: {
        main: {
            scripts: [
                './src/scripts/file1.js',
                './src/scripts/file2.js',
                './src/scripts/tps.ts'
        ],
            styles: [
                './src/styles/style1.css',
                './src/styles/style2.css',
                './src/styles/sass.scss'
            ],
            options: {
                transforms:{
                    styles: styleTransforms,
                    scripts: scriptTransforms
                }
            }
        }
    }
}