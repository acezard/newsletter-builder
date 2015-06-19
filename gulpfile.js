/*
*
* Gulpfile
* Emailing basic config
*
*/

/* ==========================================================================
    INCLUDES
============================================================================= */

var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyHTML = require('gulp-minify-html');
var inject = require('gulp-inject');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');


/* ==========================================================================
    FOLDERS
============================================================================= */
var src = './src'; // Source folder
var dest = './build'; // Destination (build) folder
var projectName = 'ink'; // Project name
var archive = './archive';

/* ==========================================================================
    TASKS
============================================================================= */

/* List :
* $ gulp html
* $ gulp images
* $ gulp watch
* $ gulp
*/

/* ===== HTML INSTALL ===== 
gulp.task('html-install', function() {
    return gulp.src('./bower_components/ink/templates/boilerplate.html')
        .pipe(gulp.dest('./src'));
}); */

/* ===== CSS INSTALL ===== */
gulp.task('css-install', function() {
    return gulp.src('./bower_components/ink/css/ink.css')
        .pipe(gulp.dest('./src'));
});

/* ===== CSS ===== */
gulp.task('css', function(){
    return gulp.src(src + '/responsive.css')
        .pipe(minifyCSS())
        .pipe(replace('__ESCAPED_SOURCE_END_CLEAN_CSS__',''))
        .pipe(rename('responsive-min.css'))
        .pipe(gulp.dest(''))
    });

/* ===== ARCHIVE ===== */
gulp.task('archive', function() {
    return gulp.src(dest + '/*')
        .pipe(zip(projectName + '.zip'))
        .pipe(gulp.dest(archive));
})

/* ===== IMAGES ARCHIVE ===== */
gulp.task('archive-img', function() {
    return gulp.src(dest + '/*.{png,jpg}')
        .pipe(zip(projectName + '-images.zip'))
        .pipe(gulp.dest(archive));
})


/* ===== HTML ===== */
gulp.task('html', function() {

  var options = {
    cdata: true,               // do no strip CDATA from scripts
    comments: true,            // do not remove comments
    quotes: true,              // do not remove arbitrary quotes
    conditionals: true,         // do not remove conditional IE comments
    spare: true,                // do not remove redundant attributes
    empty: true,                // do not remove empty attributes
    loose: false                // preserve one whitespace
  };

  // Get file
    return gulp.src('./src/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(inject(gulp.src([src + '/responsive-min.css']), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform: function (filePath, file) {
          // return file contents as string
          return file.contents.toString('utf8')
        }
      }))
        .pipe(minifyHTML(options))
        .pipe(rename('index.html'))
        // Output file
        .pipe(gulp.dest(dest));
});

/* ===== IMAGES ===== */
gulp.task('images', function () {
    return gulp.src(src + '/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dest));
});

/* ===== CLEAN ===== */
gulp.task('clean', function() {
    return gulp.src(dest).pipe(clean());
});

/* ==========================================================================
    TASK RUNNERS
============================================================================= */

/* ===== INSTALL PROJECT ===== */
gulp.task('install', ['css-install']);


/* ===== BUILD AND WATCH ===== */
gulp.task('and-watch', ['default', 'watch']);

/* ===== WATCH ===== */
gulp.task('watch', function() {
    // Folders to watch and tasks to execute
    gulp.watch([src + '/**/*'], ['default']);

});

/* ===== DEFAULT ===== */
// Default gulp task ($ gulp)
gulp.task('default', function(callback) {
  runSequence('clean',
              ['css', 'images'],
              'html',
              ['archive', 'archive-img'],
              callback);
});