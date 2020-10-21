const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const scripts = require("../scripts");
const styles = require("../styles");

var devMode = false;

gulp.task("css", function (done) {
  gulp
    .src(styles) /** src of the file for the task */
    .pipe(concat("main.css")) /** output file of the concatened files */
    .pipe(gulp.dest("../dist/css")) /** destination folder */
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
  done();
});

gulp.task("js", function (done) {
  gulp
    .src(scripts)
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("../dist/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
  done();
});

gulp.task("html", function () {
  return gulp
    .src("../src/app/**/*.html")
    .pipe(gulp.dest("../dist/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task(
  "build",
  gulp.series(gulp.parallel("css", "js", "html"), function (done) {
    done();
  })
);

gulp.task("browser-sync", function (done) {
  browserSync.init(null, {
    open: false,
    server: {
      baseDir: "dist",
    },
  });
  done();
});

gulp.task("start", gulp.series("build", "browser-sync"), function (done) {
  devMode = true;
  gulp.watch(["../src/styles/**/*.css"], ["css"]);
  gulp.watch(["../src/app/**/*.js"], ["js"]);
  gulp.watch(["../src/app/**/*.html"], ["html"]);
  done();
});
