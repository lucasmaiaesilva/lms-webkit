var gulp 		= require('gulp'),
	plumber		= require('gulp-plumber'),
	koutoSwiss	= require('kouto-swiss'),
	prefixer	= require('autoprefixer-stylus'),
	jeet		= require('jeet'),
	rupture		= require('rupture'),
	minHtml 	= require('gulp-minify-html'),
	connect 	= require('gulp-connect'),
    stylus 		= require('gulp-stylus'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	minifyCss 	= require('gulp-minify-css'),
	imagemin   	= require('gulp-imagemin'),
	concatCss 	= require('gulp-concat-css');

gulp.task('connect', function() {
  connect.server({
    root: 'build/',
    livereload: true,
      port: 8001
  });
});

/*gulp.task('min-html', function(){
	gulp.src('app/src/*.html')
		.pipe(minHtml())
		.pipe(gulp.dest('.build/'))
});*/

gulp.task('imagemin', function() {
	return gulp.src('app/src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/img'));
});

gulp.task('fonts', function(){
    gulp.src('app/src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
    .pipe(connect.reload());
});

gulp.task('scripts', function(){
	gulp.src('app/src/js/*.js') 
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(connect.reload());
});

/*gulp.task('stylus', function () {
  gulp.src('app/src/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});*/

gulp.task('stylus', function(){
		gulp.src('app/src/styl/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use:[koutoSwiss(), prefixer(), jeet(),rupture()],
			compress: true
		}))
		//.pipe(gulp.dest('_site/assets/css/'))
		//.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('build/css'))
		.pipe(connect.reload());
});

 

gulp.task('css', function(){
	gulp.src('app/src/css/*.css')
	.pipe(concatCss('plugins.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('build/css'))
	.pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('app/*.html')
  	.pipe(minHtml())
	.pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch('app/src/js/*.js', ['scripts']);
  gulp.watch('app/src/css/*.css', ['css']);
  gulp.watch('app/src/styl/*.styl', ['stylus']);
  gulp.watch('app/src/fonts/**/*', ['fonts']);
});

gulp.task('default', ['connect', 'stylus', 'fonts','watch', 'imagemin', 'scripts', 'css', 'html']);