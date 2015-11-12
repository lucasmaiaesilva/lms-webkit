var gulp 		= require('gulp'),
	react	= require('gulp-react'),
	plumber		= require('gulp-plumber'),
	koutoSwiss	= require('kouto-swiss'),
	prefixer	= require('autoprefixer-stylus'),
	jeet		= require('jeet'),
	rupture		= require('rupture'),
	minHtml 	= require('gulp-minify-html'),
	browserSync = require('browser-sync'),
    stylus 		= require('gulp-stylus'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	minifyCss 	= require('gulp-minify-css'),
	imagemin   	= require('gulp-imagemin'),
	concatCss 	= require('gulp-concat-css')
	deploy		= require('gulp-gh-pages');

gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/src/css/**/*.css',
      'app/src/img/**/*',
      'app/src/js/**/*.js',
      'app/src/jsx/**/*.jsx'
   ];

   browserSync.init(files, {
      server: {
         baseDir: 'build/'
      }
   });
});

gulp.task('imagemin', function() {
	return gulp.src('app/src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/img'));
});

gulp.task('fonts', function(){
    gulp.src('app/src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('scripts', function(){
	gulp.src('app/src/js/*.js') 
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
});

gulp.task('jsx', function(){
    return gulp.src('app/src/jsx/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('build/js'));
});

gulp.task('stylus', function(){
	gulp.src('app/src/styl/main.styl')
	.pipe(plumber())
	.pipe(stylus({
		use:[koutoSwiss(), prefixer(), jeet(),rupture()],
		compress: true
	}))
	.pipe(browserSync.reload({stream:true}))
	.pipe(gulp.dest('build/css'))
});

 

gulp.task('css', function(){
	gulp.src('app/src/css/*.css')
	.pipe(minifyCss())
	.pipe(concatCss('plugins.min.css'))
	.pipe(gulp.dest('build/css'))
});

gulp.task('html', function () {
  gulp.src('app/**/*.html')
  	///.pipe(minHtml())
	.pipe(gulp.dest('build/'))
});

gulp.task('watch', function () {
  gulp.watch(['app/**/*.html'], ['html']);
  gulp.watch('app/src/js/*.js', ['scripts']);
  gulp.watch('app/src/jsx/*.jsx', ['jsx']);
  gulp.watch('app/src/css/*.css', ['css']);
  gulp.watch('app/src/styl/*.styl', ['stylus']);
  //gulp.watch('app/src/fonts/**/*', ['fonts']);
});

// just run gulp deploy-pages to send build files to gh-pages
//gulp.task('deploy-pages', function () {
  //return gulp.src("build/**/*")
    //.pipe(deploy());
//});

// Olhar na documentação como usar o módulo deploy-pages

gulp.task('default', ['html', 'stylus', 'fonts','watch', 'imagemin', 'jsx', 'scripts', 'css', 'browser-sync']);