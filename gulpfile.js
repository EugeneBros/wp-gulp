var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(rename({suffix: '.min', prefix : ''}))
      .pipe(autoprefixer(['last 15 versions']))
      .pipe(gulp.dest('src/css'))
});

gulp.task('common-js', function() {
  return gulp.src([
    'src/js/main.js',
  ])
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/js'));
});

gulp.task('scripts', ['common-js'], function() {
  return gulp.src([
      //More plugins here
      'src/libs/jquery/jquery.js',

  ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', ['sass'], function () {
  return gulp.src('src/css/libs.css')
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('src/css'));
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['css-libs', 'scripts'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js');
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {
  var buildCss = gulp.src([
      'src/css/main.css',
      'src/css/libs.min.css'
  ])
      .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('src/js/**/*')
      .pipe(gulp.dest('dist/js'));
});