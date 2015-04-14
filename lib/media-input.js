let React = require( "react" );
let labels = require( "../labels" );
let ImageFileSelector = require( "./image-file-selector" );
let CropPanel = require( "./crop-panel" );
let cropImage = require( "./crop-image" );

let MediaInput = module.exports = React.createClass({
	displayName: "MediaInput",

	render() {
		let cropPanel;
		if( this.state.cropping && this.state.originalSrc) {
			cropPanel = (<CropPanel
				originalSrc={ this.state.originalSrc }
				onSelectRegion={ this.cropRegion }
				cancelCrop={ this.endCrop }/>);
		}

		let cropButton;
		if( this.state.originalSrc ) {
			cropButton = <button type="button" onClick={ this.startCrop }>{ labels.crop }</button>;
		}

		return (
			<div className="media">
				<img src={ this.state.croppedSrc || "images/croppedImagePlaceholder.jpg" }/>
				<ImageFileSelector onSelect={ this.selectImage }/>
				{ cropButton }
				{ cropPanel }
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
