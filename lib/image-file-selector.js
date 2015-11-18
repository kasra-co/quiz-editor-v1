"use strict";

var React = require("react");
var imageReader = require("./image-reader");

var ImageFileSelector = module.exports = React.createClass({
	displayName: "ImageFileSelector",

	propTypes: {
		onSelect: React.PropTypes.func.isRequired
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "fileUpload" },
			React.createElement("input", { type: "file", className: "imageUpload", onChange: imageReader(this.props.onSelect) }),
			React.createElement(
				"button",
				{ type: "button", className: "editorSecondaryBtn" },
				React.createElement("i", { className: "icon-upload-cloud" })
			)
		);
	}
});