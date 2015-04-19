let React = require( "react" );
let labels = require( "../labels" );
let ImageFileSelector = require( "./image-file-selector" );
let CropPanel = require( "./crop-panel" );
let cropImage = require( "./crop-image" );

let MediaInput = module.exports = React.createClass({
	displayName: "MediaInput",

	propTypes: {
		onChange: React.PropTypes.func.isRequired, // onChange( croppedImageSrc ): null
		imageSrc: React.PropTypes.string,
		aspectRatio: React.PropTypes.number,
		minSize: React.PropTypes.arrayOf( React.PropTypes.number ).isRequired
	},

	render() {
		let cropPanel;
		if( this.state.cropping && this.state.originalSrc) {
			cropPanel = <CropPanel
				originalSrc={ this.state.originalSrc }
				onSelectRegion={ this.cropRegion }
				cancelCrop={ this.endCrop }
				aspectRatio={ this.props.aspectRatio }
				minSize={ this.props.minSize } />;
		}

		let cropButton;
		if( this.props.imageSrc ) {
			cropButton = <button type="button" className="recrop" onClick={ this.startCrop }>{ labels.recrop }</button>;
		}

		return (
			<div className="media">
				<div className="croppedImagePlaceholder">
					<img className="croppedImage" src={ this.props.imageSrc }/>
				</div>
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
			1,
			function( croppedSrc ) {
				this.props.onChange( croppedSrc );
			}.bind( this )
		);
	}
});
