let React = require( "react" );
let labels = require( "../labels" );
let ImageFileSelector = require( "./image-file-selector" );
let cropImage = require( "./crop-image" );

let MediaInput = module.exports = React.createClass({
	displayName: "MediaInput",

	render() {
		let preview;
		if( this.state.croppedSrc ) {
			preview = <img src={ this.state.croppedSrc }/>;
		}

		return (
			<div>
				{ preview }
				<ImageFileSelector onSelect={ this.selectImage }/>
				<button type="button">{ labels.crop }</button>
			</div>
		);
	},

	getInitialState() {
		return {
			imageSrc: null
		};
	},

	selectImage( image ) {
		this.setState({
			originalSrc: image.src
		});


		let cropped = cropImage(
			this.state.originalSrc, {
				x: 0, y: 0,
				width: 400, height: 400
			},
			0.5,
			function( croppedSrc ) {
				this.setState({ croppedSrc });
			}.bind( this )
		);
	}
});
