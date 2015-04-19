var React = require( "react" );
var _ = require( "lodash");
var labels = require("../labels");

var QuizResults = require( "./quiz-results" );
var QuizQuestions = require( "./quiz-questions" );

var Quiz = module.exports = React.createClass({
	displayName: "Quiz",

	propTypes: {
		quiz: React.PropTypes.shape({
			questions: React.PropTypes.array.isRequired,
			results: React.PropTypes.array.isRequired
		}).isRequired,
		updateQuiz: React.PropTypes.func.isRequired
	},

	getDefaultProps: function() {
		return {
			quiz: {
				questions: [{
					answers:[ "", ""]
				}],
				results: [{},{}]
			}
		};
	},

	addResult: function() {
		var questions = this.props.quiz.questions.map( function (question){
			var answers = question.answers.concat("");
			return _.merge( question, { answers: answers });
		});
		this.updateQuiz({
			results: this.props.quiz.results.concat({}),
			questions: questions
		});
	},

	removeResult: function (index) {
		var questions = this.props.quiz.questions.map( function (question) {
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

	removeQuestion: function( index ) {
		this.props.updateQuiz({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions.filter( function( q, i ) {
				return i !== index;
			})
		});
	},

	updateQuestion: function (question, index) {
		this.updateItem("questions", question, index);
	},

	updateItem: function (prop, value, index) {
		var change = {};
		change [prop] = this.props.quiz[prop].map( function ( v, i ) {
			if ( i !== index){
				return v;
			}
			return value;
		});
		this.props.updateQuiz( _.merge({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions
		},
		change ));
	},

	updateResult: function(result, index) {
		this.updateItem("results", result, index);
	},

	addQuestion: function () {
		this.props.updateQuiz ({
			results: this.props.quiz.results,
			questions: this.props.quiz.questions.concat({
				answers:_.range(this.props.results.length).map( function(){ return ""; })
			})
		});

	},

	render: function() {
		var resultTitles = this.props.quiz.results.map( function (result) {
			return result.title;
		});

		console.log( this.props.quiz.questions );

		return (
			<div id="quizComponent">
				<QuizResults
					addResult={ this.addResult }
					removeResult={ this.removeResult }
					updateResult={ this.updateResult }
					results={ this.props.quiz.results } />
				<QuizQuestions
					addQuestion={ this.addQuestion }
					removeQuestion={ this.removeQuestion }
					updateAnswer={ this.updateAnswer }
					updateQuestion={ this.updateQuestion }
					questions={ this.props.quiz.questions }
					resultTitles={ resultTitles } />
			</div>
		);
	}
});
