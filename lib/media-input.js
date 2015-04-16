let React = require( "react" );
let labels = require( "../labels" );
let ImageFileSelector = require( "./image-file-selector" );
let CropPanel = require( "./crop-panel" );
let cropImage = require( "./crop-image" );

let MediaInput = module.exports = React.createClass({
	displayName: "MediaInput",

	propTypes: {
		imageSrc: React.PropTypes.string,
		aspectRatio: React.PropTypes.number,
		onChange: React.PropTypes.func.isRequired // onChange( croppedImageSrc ): null
	},

	render() {
		let cropPanel;
		if( this.state.cropping && this.state.originalSrc) {
			cropPanel = <CropPanel
				originalSrc={ this.state.originalSrc }
				onSelectRegion={ this.cropRegion }
				cancelCrop={ this.endCrop }
				aspectRatio={ this.props.aspectRatio }
				/>;
		}

		let cropButton;
		if( this.state.originalSrc ) {
			cropButton = <button type="button" className="recrop" onClick={ this.startCrop }>{ labels.recrop }</button>;
		}

		return (
			<div className="media">
				<img className="croppedImage" src={ this.props.imageSrc || "images/croppedImagePlaceholder.jpg" }/>
				<ImageFileSelector onSelect={ this.selectImage }/>
				{ cropButton }
				{ cropPanel }
			</div>
		);
	},

	getInitialState() {
		return {};
	},

	selectImage( image ) {
		this.setState({
			originalSrc: image.src,
			cropping: true
		});
	},

	startCrop() {
		this.setState({
			cropping: true
		});
	},

	endCrop() {
		this.setState({
			cropping: false
		});
	},

	cropRegion( region ) {
		this.setState({
			cropping: false
		});

		cropImage(
			this.state.originalSrc,
			region,
			0.5,
			function( croppedSrc ) {
				this.props.onChange( croppedSrc );
			}.bind( this )
		);
	}
});
