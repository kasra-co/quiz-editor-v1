let React = require( "react" );

let ImageFileSelector = module.exports = React.createClass({
	propTypes: {
		onSelect: React.PropTypes.func.isRequired
	},

	onSelect( event ) {
		if( !event.target.files.length ) {
			// User cancelled file upload
			return;
		}

		let file = event.target.files[ 0 ];

		if( !file.type.match( /^image\// )) {
			return;
		}

		let reader = new FileReader();

		reader.onloadend = function( event ) {
			let image = new Image();

			image.onload = function( event ) {
				this.props.onSelect( image );
			}.bind( this );

			image.src = event.target.result;
		}.bind( this );

		reader.readAsDataURL( file );
	},

	render() {
		return (
			<div className="media clearfix">
				<div className="fileUpload">
					<input type="file" className="imageUpload" onChange={ this.onSelect }/>
					<button className="editorSecondaryBtn">
						<i className="icon-upload-cloud"></i>
					</button>
				</div>
				<div className="imagePreview">
				</div>
			</div>
		);
	}
});

