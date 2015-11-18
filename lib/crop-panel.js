"use strict";

var React = require("react");
var SelectRect = require("select-rect");
var labels = require("../labels");

var CropPanel = module.exports = React.createClass({
	displayName: "CropPanel",

	propTypes: {
		originalSrc: React.PropTypes.string,
		onSelectRegion: React.PropTypes.func.isRequired,
		cancelCrop: React.PropTypes.func.isRequired,
		aspectRatio: React.PropTypes.number,
		size: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	},

	imgOnLoad: function imgOnLoad(image) {
		var width = image.offsetWidth;
		var height = image.offsetHeight;

		this.setState({
			landscape: width > height
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "cropPreview " + (this.state && this.state.landscape ? "landscape" : "portrait") },
			React.createElement(SelectRect, {
				imgOnLoad: this.imgOnLoad,
				backgroundSrc: this.props.originalSrc,
				updateSelection: this.updateSelection,
				aspectRatio: this.props.aspectRatio,
				size: this.props.size }),
			React.createElement(
				"button",
				{ className: "cropButton", onClick: this.select, type: "button" },
				labels.crop
			),
			React.createElement(
				"button",
				{ onClick: this.props.cancelCrop, type: "button" },
				labels.cancel
			)
		);
	},
	updateSelection: function updateSelection(x0, y0, x1, y1) {
		this.setState({ x0: x0, y0: y0, x1: x1, y1: y1 });
	},
	select: function select() {
		this.props.onSelectRegion({
			x: this.state.x0,
			y: this.state.y0,
			width: this.state.x1 - this.state.x0,
			height: this.state.y1 - this.state.y0
		});
	}
});