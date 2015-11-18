"use strict";

var React = require("react");
var labels = require("../labels");
var ImageFileSelector = require("./image-file-selector");
var CropPanel = require("./crop-panel");
var cropImage = require("./crop-image");

var MediaInput = module.exports = React.createClass({
	displayName: "MediaInput",

	propTypes: {
		onChange: React.PropTypes.func.isRequired, // onChange( croppedImageSrc ): null
		imageSrc: React.PropTypes.string,
		aspectRatio: React.PropTypes.number,
		size: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	},

	render: function render() {
		var cropPanel = undefined;
		if (this.state.cropping && this.state.originalSrc) {
			cropPanel = React.createElement(CropPanel, {
				originalSrc: this.state.originalSrc,
				onSelectRegion: this.cropRegion,
				cancelCrop: this.endCrop,
				aspectRatio: this.props.aspectRatio,
				size: this.props.size });
		}

		var cropButton = undefined;
		if (this.props.imageSrc) {
			cropButton = React.createElement(
				"button",
				{ type: "button", className: "recrop", onClick: this.startCrop },
				labels.recrop
			);
		}

		return React.createElement(
			"div",
			{ className: "media" },
			this.state && this.state.message ? React.createElement(
				"p",
				null,
				this.state.message
			) : null,
			React.createElement(
				"div",
				{ className: "croppedImagePlaceholder" },
				React.createElement("img", { className: "croppedImage", src: this.props.imageSrc })
			),
			React.createElement(ImageFileSelector, { onSelect: this.selectImage }),
			cropButton,
			cropPanel
		);
	},
	getInitialState: function getInitialState() {
		return {};
	},
	selectImage: function selectImage(image) {
		if (image.width < this.props.size[0] || image.height < this.props.size[1]) {
			this.setState({
				message: labels.imageSizeError
			});
		} else {
			this.setState({
				originalSrc: image.src,
				cropping: true,
				message: null
			});
		}
	},
	startCrop: function startCrop() {
		this.setState({
			cropping: true
		});
	},
	endCrop: function endCrop() {
		this.setState({
			cropping: false
		});
	},
	cropRegion: function cropRegion(region) {
		this.setState({
			cropping: false
		});

		cropImage(this.state.originalSrc, region, this.props.size, 1, (function (croppedSrc) {
			this.props.onChange(croppedSrc);
		}).bind(this));
	}
});