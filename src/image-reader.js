var imageReader = module.exports = function ( receiveImage ) {
	return function ( event ) {
		if( !event.target.files.length ) {
			// User cancelled file upload
			return;
		}

		var file = event.target.files[ 0 ];

		if( !file.type.match( /^image\// )) {
			return;
		}

		var reader = new FileReader();

		reader.onloadend = function( event ) {
			var image = new Image();

			image.onload = function( event ) {
				receiveImage( image );
			}.bind( this );

			image.src = event.target.result;
		}.bind( this );

		reader.readAsDataURL( file );
	};
};
