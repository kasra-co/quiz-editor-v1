"use strict";

var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var AnswerPanel = module.exports = React.createClass({
	displayName: "AnswerPanel",

	propTypes: {
		answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		title: React.PropTypes.string,
		updateAnswer: React.PropTypes.func.isRequired
	},

	render: function render() {
		var answers = this.props.answers.map((function (answer, index) {
			var setAnswer = (function (event) {
				var answers = _.clone(this.props.answers);
				answers[index] = event.target.value;
				this.props.updateAnswer(answers);
			}).bind(this);
			return React.createElement(
				"label",
				{ key: index },
				React.createElement(
					"span",
					{ className: "label" },
					this.props.resultTitles[index]
				),
				React.createElement("input", {
					type: "text",
					onChange: setAnswer,
					value: answer })
			);
		}).bind(this));
		return React.createElement(
			"div",
			{ className: "answerPanel" },
			React.createElement(
				"p",
				null,
				this.props.title
			),
			answers
		);
	}

});