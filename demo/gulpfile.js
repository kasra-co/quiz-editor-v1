'use strict';

var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var watchify = require( 'watchify' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );
var sass = require( 'gulp-ruby-sass' );
var _ = require( 'lodash' );

gulp.task( 'watch', [ 'html', 'sass', 'images', 'fonts', 'config' ], function() {
	gulp.watch( '../style/**/*.scss', [ 'sass' ]);
	gulp.watch( 'src/index.html', [ 'html' ]);
	gulp.watch( 'src/images/**/*', [ 'images' ]);
	gulp.watch( 'src/font/**/*', [ 'fonts' ]);
	gulp.watch( 'src/config/**/*', [ 'config' ]);
	bundle();
});

gulp.task( 'html', function() {
	gulp.src( 'src/index.html' )
	.pipe( gulp.dest( 'dist' ));
});

gulp.task( 'sass', function() {
	return sass( 'src/index.scss' )
	.on('error', function (err){
		console.error('Error', err.message);
	})
	.pipe( gulp.dest( 'dist' ));
});

gulp.task( 'images', function() {
	gulp.src( 'src/images/**/*' )
	.pipe( gulp.dest( 'dist/images' ));
});

gulp.task( 'fonts', function() {
	gulp.src( 'src/font/**/*' )
	.pipe( gulp.dest( 'dist/font' ));
});

gulp.task( 'config', function() {
	gulp.src( 'src/config/**/*' )
	.pipe( gulp.dest( 'dist/config' ));
});

// Watchify helps Browserify to only rebuild the parts of a source tree that are affected by a change, to reduce build time.
// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
var bundler = watchify( browserify(
	'./src/index.js',
	_.extend(
		watchify.args,
		{ debug: true }
	)
));

bundler.transform( 'reactify' );
bundler.transform( 'es6ify' );

bundler.on( 'update', bundle ); // On any dependency update, run the bundler
bundler.on( 'log', gutil.log ); // Help bundler log to the terminal

function bundle() {
	return bundler.bundle()
	.on( 'error', gutil.log.bind( gutil, 'Browserify error' )) // Log errors during build
	.pipe( source( 'index.min.js' ))
	.pipe( gulp.dest( './dist' ));
}
