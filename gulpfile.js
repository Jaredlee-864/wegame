const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const connect = require("gulp-connect");

gulp.task("copyhtml", (done) => {
  gulp
    .src("./html/*.html")
    .pipe(gulp.dest("./dist/html"))
    .pipe(connect.reload());
  done();
});
gulp.task("copycss", (done) => {
  gulp.src("./css/*.css").pipe(gulp.dest("./dist/css")).pipe(connect.reload());
  done();
});
gulp.task("copyjs", (done) => {
  gulp.src("./js/*.js").pipe(gulp.dest("./dist/js")).pipe(connect.reload());
  done();
});
gulp.task("copyimg", (done) => {
  gulp.src("./img/**").pipe(gulp.dest("./dist/img")).pipe(connect.reload());
  done();
});
gulp.task("copydata", (done) => {
  gulp.src("./data/**").pipe(gulp.dest("./dist/data")).pipe(connect.reload());
  done();
});
gulp.task("copyicon", (done) => {
  gulp
    .src("./iconfont/**")
    .pipe(gulp.dest("./dist/iconfont"))
    .pipe(connect.reload());
  done();
});

gulp.task("watch", (done) => {
  gulp.watch(
    [
      "./html/*.html",
      "./css/*.css",
      "./js/*.js",
      "./img/**",
      "./data/**",
      "./iconfont/**",
    ],
    gulp.series(
      "copyhtml",
      "copycss",
      "copyjs",
      "copyimg",
      "copydata",
      "copyicon"
    )
  );
  done();
});
gulp.task("server", (done) => {
  connect.server({
    root: "dist",
    livereload: true,
    port: 5000,
  });
  done();
});
gulp.task("default", gulp.series("watch", "server"));
