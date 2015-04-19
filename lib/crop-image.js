let loadImage = function( src, done ) {
	let image = new Image();

	image.onload = function() {
		done( image );
	};

	image.src = src.src || src;
};

// Takes a source image (object or src) and returns a cropped version

let cropImage = module.exports = function( sourceImage, sourceRect, size, scale, done ) {
	loadImage( sourceImage, function( sourceImage ) {

		let canvas = document.createElement( "canvas" );
		canvas.width = size[ 0 ] * scale;
		canvas.height = size[ 1 ] * scale;

		let ctx = canvas.getContext( "2d" );
		ctx.drawImage( sourceImage,
			sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
			0, 0, size[ 0 ] * scale, size[ 1 ] * scale );

		done( canvas.toDataURL( "image/jpg", 0.9 ));
	});
};
