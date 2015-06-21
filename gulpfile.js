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
var notifier = require('node-notifier');
var jade = require('gulp-jade');


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

/* ===== TEMPLATES ===== */
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(src + '/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(rename('intermediate.html'))
    .pipe(gulp.dest(src))
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
    cdata: false,               // do no strip CDATA from scripts
    comments: true,            // do not remove comments
    quotes: false,              // do not remove arbitrary quotes
    conditionals: false,         // do not remove conditional IE comments
    spare: false,                // do not remove redundant attributes
    empty: false,                // do not remove empty attributes
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
        .pipe(inject(gulp.src([src + '/responsive.css']), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform: function (filePath, file) {
          // return file contents as string
          return file.contents.toString('utf8')
        }
      }))
        .pipe(minifyHTML(options))
        .pipe(rename('index.html'))
        // Output file
        .pipe(gulp.dest(archive))
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
        .pipe(gulp.dest(dest))
});

/* ===== CLEAN ===== */
gulp.task('clean', function() {
    return gulp.src(dest).pipe(clean());
});
/* ===== CLEAN-ZIP ===== */
gulp.task('clean-zip', function() {
    return gulp.src(archive).pipe(clean());
});

/* ===== NOTIFY ===== */
gulp.task('notify', function() {
    notifier.notify({
        'title': 'Newsletter Builder',
        'message': 'Task completed',
        'icon': 'C:/Dev/ink/notifier-icon.png'
    });
});

/* ==========================================================================
    TASK RUNNERS
============================================================================= */

/* ===== INSTALL PROJECT ===== */
gulp.task('install', ['css-install', 'templates']);


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
  runSequence(['clean', 'clean-zip'],
              'templates',
              'images',
              'html',
              ['archive', 'archive-img'],
              'notify',
              callback);
});