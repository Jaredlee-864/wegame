const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");

gulp.task("copyhtml", (done) => {
  gulp.src("./html/*.html").pipe(gulp.dest("./dist/html"));
  done();
});
gulp.task("copycss", (done) => {
  gulp.src("./css/*.css").pipe(gulp.dest("./dist/css"));
  done();
});
gulp.task("copyjs", (done) => {
  gulp.src("./js/*.js").pipe(gulp.dest("./dist/js"));
  done();
});

gulp.task("watch", (done) => {
  gulp.watch(
    ["./html/*.html", "./css/*.css", "./js/*.js"],
    gulp.series("copyhtml", "copycss", "copyjs")
  );
  done();
});

gulp.task("default", gulp.series("watch"));
