"use strict";

var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var TabView = require("tab-component").TabView;
var QuestionPanel = require("./question-panel");
var AnswerPanel = require("./answer-panel");

var QuizQuestions = module.exports = React.createClass({
	displayName: "QuizQuestions",

	propTypes: {
		questions: React.PropTypes.arrayOf(React.PropTypes.shape({
			answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
		})),
		updateQuestion: React.PropTypes.func.isRequired,
		addQuestion: React.PropTypes.func.isRequired
	},

	getInitialState: function getInitialState() {
		return {
			open: true
		};
	},

	expandCollapse: function expandCollapse() {
		this.setState({
			open: !this.state.open
		});
	},

	render: function render() {
		var Questions = this.props.questions.map((function (question, index) {

			var updateThisQuestion = (function (questionChange) {
				this.props.updateQuestion(_.merge(question, questionChange), index);
			}).bind(this);

			var updateThisAnswer = (function (answers) {
				this.props.updateQuestion(_.merge(question, { answers: answers }), index);
			}).bind(this);

			var removeQuestion = (function () {
				this.props.removeQuestion(index);
			}).bind(this);

			var questionTabNumber = " " + (index + 1);

			return React.createElement(TabView, {
				key: index,
				initialSelection: 0,
				tabLabels: [labels.questionTabLabel + "#" + questionTabNumber, labels.answerTabLabel],
				tabPanels: [React.createElement(QuestionPanel, {
					removeQuestion: this.props.removeQuestion,
					question: question,
					updateQuestion: updateThisQuestion }), React.createElement(AnswerPanel, {
					resultTitles: this.props.resultTitles,
					updateAnswer: updateThisAnswer,
					answers: question.answers,
					title: question.prompt })],
				removeQuestion: removeQuestion,
				deletePanel: React.createElement(
					"a",
					{ onClick: removeQuestion, className: "deleteQuestion" },
					React.createElement("i", { className: "icon-trash" }),
					labels.deleteQuestion
				) });
		}).bind(this));

		var addNewQuestion;
		if (this.props.questions.length <= 9) {
			addNewQuestion = React.createElement(
				"button",
				{ type: "button", id: "addNewQuestion", className: "editorSecondaryBtn", onClick: this.props.addQuestion },
				labels.addNewQuestion
			);
		}
		var questionBlockBody = React.createElement(
			"div",
			null,
			Questions,
			addNewQuestion
		);
		return React.createElement(
			"div",
			{ id: "quizQuestions", className: "editorBlock" },
			React.createElement(
				"a",
				{ onClick: this.expandCollapse, className: "caret " + (this.state && this.state.open ? "open" : "") },
				React.createElement("span", null)
			),
			React.createElement(
				"h2",
				{ className: "editorSubHeading" },
				labels.questionPanelTitle
			),
			this.state && this.state.open ? questionBlockBody : null
		);
	}
});