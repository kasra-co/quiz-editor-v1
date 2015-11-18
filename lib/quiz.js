"use strict";

var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var QuizResults = require("./quiz-results");
var QuizQuestions = require("./quiz-questions");

var Quiz = module.exports = React.createClass({
	displayName: "Quiz",

	propTypes: {
		quiz: React.PropTypes.shape({
			questions: React.PropTypes.array.isRequired,
			results: React.PropTypes.array.isRequired
		}).isRequired,
		updateQuiz: React.PropTypes.func.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			quiz: {
				questions: [{
					answers: ["", ""]
				}],
				results: [{}, {}]
			}
		};
	},

	addResult: function addResult() {
		var questions = this.props.quiz.questions.map(function (question) {
			var answers = question.answers.concat("");
			return _.merge(question, { answers: answers });
		});
		this.props.updateQuiz({
			results: this.props.quiz.results.concat({}),
			questions: questions
		});
	},

	removeResult: function removeResult(index) {
		var questions = this.props.quiz.questions.map(function (question) {
			question.answers = _.reject(question.answers, function (answer, i) {
				return i === index;
			});

			return question;
		});
		this.props.updateQuiz({
			results: _.reject(this.props.quiz.results, function (result, i) {
				return i === index;
			}),
			questions: questions
		});
	},

	removeQuestion: function removeQuestion(index) {
		this.props.updateQuiz({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions.filter(function (q, i) {
				return i !== index;
			})
		});
	},

	updateQuestion: function updateQuestion(question, index) {
		this.updateItem("questions", question, index);
	},

	updateItem: function updateItem(prop, value, index) {
		var change = {};
		change[prop] = this.props.quiz[prop].map(function (v, i) {
			if (i !== index) {
				return v;
			}
			return value;
		});
		this.props.updateQuiz(_.merge({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions
		}, change));
	},

	updateResult: function updateResult(result, index) {
		this.updateItem("results", result, index);
	},

	addQuestion: function addQuestion() {
		this.props.updateQuiz({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions.concat({
				answers: _.range(this.props.quiz.results.length).map(function () {
					return "";
				})
			})
		});
	},

	render: function render() {
		var resultTitles = this.props.quiz.results.map(function (result) {
			return result.title;
		});

		return React.createElement(
			"div",
			{ id: "quizComponent" },
			React.createElement(QuizResults, {
				addResult: this.addResult,
				removeResult: this.removeResult,
				updateResult: this.updateResult,
				results: this.props.quiz.results }),
			React.createElement(QuizQuestions, {
				addQuestion: this.addQuestion,
				removeQuestion: this.removeQuestion,
				updateAnswer: this.updateAnswer,
				updateQuestion: this.updateQuestion,
				questions: this.props.quiz.questions,
				resultTitles: resultTitles })
		);
	}
});