"use strict";

var React = require("react");
var MediaInput = require("./media-input");
var _ = require("lodash");
var labels = require("../labels");

var ResultPanel = module.exports = React.createClass({
	displayName: "ResultPanel",

	getDefaultProps: function getDefaultProps() {
		return {
			result: {}
		};
	},

	propTypes: {
		result: React.PropTypes.shape({
			title: React.PropTypes.string,
			text: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.string,
				caption: React.PropTypes.string
			})
		}),
		updateResult: React.PropTypes.func.isRequired
	},

	setTitle: function setTitle(event) {
		this.props.updateResult({ title: event.target.value });
	},

	setText: function setText(event) {
		this.props.updateResult({ text: event.target.value });
	},

	setImage: function setImage(image) {
		this.props.updateResult({
			media: _.merge(this.props.result && this.props.result.media || {}, { image: image })
		});
	},

	setMediaTitle: function setMediaTitle(event) {
		this.props.updateResult({
			media: _.merge(this.props.result && this.props.result.media || {}, { title: event.target.value })
		});
	},

	setCaption: function setCaption(event) {
		this.props.updateResult({
			media: _.merge(this.props.result && this.props.result.media || {}, { caption: event.target.value })
		});
	},

	setAltText: function setAltText(event) {
		this.props.updateResult({
			media: _.merge(this.props.result && this.props.result.media || {}, { altText: event.target.value })
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "resultPanel" },
			React.createElement(
				"label",
				null,
				React.createElement(
					"span",
					{ className: "label" },
					labels.resultTitle
				),
				React.createElement("input", { type: "text",
					onChange: this.setTitle,
					value: this.props.result ? this.props.result.title : null })
			),
			React.createElement(
				"label",
				null,
				React.createElement(
					"span",
					{ className: "label resultText" },
					labels.resultText
				),
				React.createElement("textarea", {
					onChange: this.setText,
					value: this.props.result ? this.props.result.text : null })
			),
			React.createElement(
				"div",
				{ className: "clearfix" },
				React.createElement(
					"h3",
					{ className: "imageMetaLabel" },
					labels.mediaMeta
				),
				React.createElement(MediaInput, {
					imageSrc: this.props.result && this.props.result.media && this.props.result.media.image,
					onChange: this.setImage,
					aspectRatio: 1,
					size: [180, 180] }),
				React.createElement(
					"div",
					{ className: "mediaMeta" },
					React.createElement(
						"label",
						null,
						React.createElement(
							"span",
							{ className: "label" },
							labels.imageTitle
						),
						React.createElement("input", { type: "text",
							onChange: this.setMediaTitle,
							value: this.props.result.media ? this.props.result.media.title : null })
					),
					React.createElement(
						"label",
						null,
						React.createElement(
							"span",
							{ className: "label" },
							labels.altText
						),
						React.createElement("input", { type: "text",
							onChange: this.setAltText,
							value: this.props.result.media ? this.props.result.media.altText : null })
					),
					React.createElement(
						"label",
						null,
						React.createElement(
							"span",
							{ className: "label" },
							labels.caption
						),
						React.createElement("input", { type: "text",
							onChange: this.setCaption,
							value: this.props.result.media ? this.props.result.media.caption : null })
					)
				)
			)
		);
	}
});