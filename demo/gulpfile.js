'use strict';

var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var watchify = require( 'watchify' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var sourcemaps = require( 'gulp-sourcemaps' );

gulp.task( 'html', function() {
	gulp.src( 'src/index.html' )
	.pipe( gulp.dest( 'dist' ));
});

// Watchify helps Browserify to only rebuild the parts of a source tree that are affected by a change, to reduce build time.
// See https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
var bundler = watchify( browserify( './src/index.js', watchify.args ));
bundler.transform( 'reactify' );

gulp.task( 'watch', [ 'html' ], bundle ); // `gulp demo:build` to start the build
bundler.on( 'update', bundle ); // On any dependency update, run the bundler
bundler.on( 'log', gutil.log ); // Help bundler log to the terminal

function bundle() {
	return bundler.bundle()
	.on( 'error', gutil.log.bind( gutil, 'Browserify error' )) // Log errors during build
	.pipe( source( 'index.min.js' ))
	.pipe( buffer() )
	.pipe( sourcemaps.init({ loadMaps: true }))
	.pipe( gulp.dest( './dist' ));
}
