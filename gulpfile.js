var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');

var config = {
	styles:{
		main: './src/stylus/*.styl',
		watch: './src/stylus/**/*.styl',
		output: './build/resources/css',
		outputDist: './dist'
	},
	html:{
		watch: './build/Pufi/*.html',
	},
	scripts:{
		main: './src/javascript/javascript.js',
		watch: './src/javascript/**/*.js',
		output: './build/resources/js'
	}
}

gulp.task('server', function(){
	gulp.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: '3001',
			livereload: true,
		}))
});

gulp.task('build:css', async function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib,
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(config.styles.output))
})

gulp.task('build:js', async  function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output))
})


gulp.task('watch', function(){
	gulp.watch(config.styles.watch,  {ignoreInitial: false}, gulp.series('build:css', 'build:js'));
})


/*--- Tasks Runners --*/

gulp.task('build', gulp.series('build:css', 'build:js'));

gulp.task('development', gulp.series('server', 'watch', 'build'));

