"use strict";

var React = require("react");
var labels = require("../labels");
var _ = require("lodash");
var MediaInput = require("./media-input");

var QuestionPanel = module.exports = React.createClass({
	displayName: "QuestionPanel",

	getDefaultProps: function getDefaultProps() {
		return {
			question: {}
		};
	},

	propTypes: {
		question: React.PropTypes.shape({
			prompt: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.string,
				caption: React.PropTypes.string
			})
		}).isRequired,
		updateQuestion: React.PropTypes.func.isRequired
	},

	setTitle: function setTitle(event) {
		this.props.updateQuestion(_.merge(this.props.question, {
			prompt: event.target.value
		}));
	},

	setMediaTitle: function setMediaTitle(event) {
		this.props.updateQuestion({
			media: _.merge(this.props.question && this.props.question.media || {}, { title: event.target.value })
		});
	},

	setCaption: function setCaption(event) {
		this.props.updateQuestion({
			media: _.merge(this.props.question && this.props.question.media || {}, { caption: event.target.value })
		});
	},

	setAltText: function setAltText(event) {
		this.props.updateQuestion({
			media: _.merge(this.props.question && this.props.question.media || {}, { altText: event.target.value })
		});
	},

	setImage: function setImage(imageSrc) {
		this.props.updateQuestion({
			media: _.merge(this.props.question && this.props.question.media || {}, { image: imageSrc })
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "questionPanel" },
			React.createElement(
				"label",
				null,
				React.createElement(
					"span",
					{ className: "label" },
					labels.questionTitle
				),
				React.createElement("input", { type: "text",
					onChange: this.setTitle,
					value: this.props.question.prompt })
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
					imageSrc: this.props.question && this.props.question.media && this.props.question.media.image,
					onChange: this.setImage,
					media: this.props.question.media,
					aspectRatio: 3 / 1,
					size: [600, 200] }),
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
							value: this.props.question.media ? this.props.question.media.title : null })
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
							value: this.props.question.media ? this.props.question.media.altText : null })
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
							value: this.props.question.media ? this.props.question.media.caption : null })
					)
				)
			)
		);
	}

});