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
var del = require('del');
var notifier = require('node-notifier');
var jade = require('gulp-jade');


/* ==========================================================================
    FOLDERS
============================================================================= */
var srcDir = '../src'; // Source folder
var buildDir = '../../build'; // Destination (build) folder
var projectName = 'export'; // Project name
var exportDir = '../../export';

/* ==========================================================================
    TASKS
============================================================================= */

/* List :
* $ gulp html
* $ gulp images
* $ gulp watch
* $ gulp
*/

/* ===== TEMPLATES ===== */
gulp.task('templates', function() {

  gulp.src(srcDir + '/html/template.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename('intermediate.html'))
    .pipe(gulp.dest(srcDir + '/html'))
});

/* ===== ARCHIVE ===== */
gulp.task('export', function() {
    return gulp.src(buildDir + '/*')
        .pipe(zip(projectName + '.zip'))
        .pipe(gulp.dest(exportDir));
})

/* ===== IMAGES ARCHIVE ===== */
gulp.task('export-img', function() {
    return gulp.src(buildDir + '/*.{png,jpg}')
        .pipe(zip(projectName + '-images.zip'))
        .pipe(gulp.dest(exportDir));
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
    return gulp.src(srcDir + '/html/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(inject(gulp.src([srcDir + '/css/responsive.css']), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform: function (filePath, file) {
          // return file contents as string
          return file.contents.toString('utf8')
        }
      }))
        .pipe(minifyHTML(options))
        .pipe(rename('index.html'))
        // Output file
        .pipe(gulp.dest(exportDir))
        .pipe(gulp.dest(buildDir));
});

/* ===== IMAGES ===== */
gulp.task('images', function () {
    return gulp.src(srcDir + '/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildDir))
});

/* ===== CLEAN ===== */
// Delete everything in destination folder
gulp.task('clean', function (cb) {
  del([!buildDir + '/.gitignore', buildDir + '/**/*'], {force: true}, cb);
});
/* ===== CLEAN-ZIP ===== */
gulp.task('clean-zip', function(cb) {
    del([!exportDir + '/.gitignore', exportDir + '/**/*'], {force: true}, cb);
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

/* ===== BUILD AND WATCH ===== */
gulp.task('and-watch', ['default', 'watch']);

/* ===== WATCH ===== */
gulp.task('watch', function() {
    // Folders to watch and tasks to execute
    gulp.watch([srcDir + '/html/jade.html'], ['templates', 'html']);
    gulp.watch([srcDir + '/images/*'], ['images']);
    gulp.watch([srcDir + '/css/*'], ['html']);

});

/* ===== DEFAULT ===== */
// Default gulp task ($ gulp)
gulp.task('default', function(callback) {
  runSequence(['clean', 'clean-zip'],
              'templates',
              'images',
              'html',
              ['export', 'export-img'],
              'notify',
              callback);
});