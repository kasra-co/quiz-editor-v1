var React = require( "react" );
var _ = require( "lodash");

var QuizResults = require( "./quiz-results" );
var QuizQuestions = require( "./quiz-questions" );

var Quiz = module.exports = React.createClass({
	displayName: "Quiz",

	propTypes: {
		initialQuiz: React.PropTypes.object,
		updateQuiz: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		if (this.props.initialQuiz) {
			return this.props.initialQuiz;
		}
		return {
			questions: [{
				answers:[ "", ""]
			}],
			results: [{},{}]
		};
	},

	componentDidUpdate: function () {
		this.props.updateQuiz(_.cloneDeep(this.state));
	},

	addResult: function() {
		var questions = this.state.questions.map( function (question){
			var answers = question.answers.concat("");
			return _.merge( question, { answers: answers });
		});
		this.setState({
			results: this.state.results.concat({}),
			questions: questions
		});
	},

	removeResult: function (index) {
		var questions = this.state.questions.map( function (question) {
			question.answers = _.reject(question.answers, function (answer, i) {
				return i === index;
			});

			return question;
		});
		this.setState({
			results: _.reject(this.state.results, function (result, i) {
				return i === index;
			}),
			questions: questions
		});

	},

	removeQuestion: function( index ) {
		this.setState({
			questions: this.state.questions.filter( function( q, i ) {
				return i !== index;
			})
		});
	},

	updateQuestion: function (question, index) {
		this.updateStateItem("questions", question, index);
	},

	updateStateItem: function (prop, value, index) {
		var change = {};
		change [prop] = this.state[prop].map( function ( v, i ) {
			if ( i !== index){
				return v;
			}
			return value;
		});
		this.setState(change);
	},

	updateResult: function(result, index) {
		this.updateStateItem("results", result, index);
	},

	addQuestion: function () {
		this.setState ({
			questions: this.state.questions.concat({
				answers:_.range(this.state.results.length).map( function(){ return ""; })
			})
		});

	},

	render: function() {
		var resultTitles = this.state.results.map( function (result) {
			return result.title;
		});
		return (
			<div id="quizComponent">
				<QuizResults
					addResult={ this.addResult }
					removeResult={ this.removeResult }
					updateResult={ this.updateResult }
					results={ this.state.results } />
				<QuizQuestions
					addQuestion={ this.addQuestion }
					removeQuestion={ this.removeQuestion }
					updateAnswer={ this.updateAnswer }
					updateQuestion={ this.updateQuestion }
					questions={ this.state.questions }
					resultTitles={ resultTitles } />
			</div>
		);
	}
});
