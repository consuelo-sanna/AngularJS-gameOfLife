/** cmd gulp to create dist folder and for gulpfile change;
 *  cmd gulp start to start the browser
 */

const { src, dest, parallel, series, watch } = require("gulp");

// Load plugins

const concat = require("gulp-concat");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const browsersync = require("browser-sync").create();

const scripts = require("../scripts");
const styles = require("../styles");

// Clean dist

function clear() {
  return src("./dist/*", {
    read: false,
  }).pipe(clean());
}

// JS function

function js() {
  return src(scripts)
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(dest("../dist/js/"))
    .pipe(browsersync.stream());
}

// CSS function
function css() {
  return src(styles) /** src of the file for the task */
    .pipe(concat("main.css")) /** output file of the concatened files */
    .pipe(dest("../dist/css")) /** destination folder */
    .pipe(browsersync.stream()); /** keep watching and reload the browser */
}

// html

function html() {
  return src("../src/app/**/*.html")
    .pipe(dest("../dist/"))
    .pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
  watch("../src/styles/**/*.css", css);
  watch("./src/app/**/*.js", js);
  watch("../src/app/**/*.html", html);
}

// BrowserSync

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "../dist",
    },
    port: 3000,
  });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.start = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, html));
