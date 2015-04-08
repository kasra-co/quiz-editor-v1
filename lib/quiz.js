var React = require( 'react' );
var _ = require( 'lodash');

var QuizResults = require( './quiz-results' );
var QuizQuestions = require( './quiz-questions' );

var Quiz = module.exports = React.createClass({

	getInitialState: function() {
		return {
			questions: [{
				answers:[ "", ""]
			}],
			results: [{},{}]
		}
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

	updateQuestion: function (question, index) {
		this.setState({
			questions: this.state.questions.map( function (q, i) {
				if ( i !== index){
					return q;
				}
				return question;
			})
		})
	},

	addQuestion: function () {
		this.setState ({
			questions: this.state.questions.concat({
				answers:_.range(this.state.results.length).map(function(){return ""})
			})
		});

	},

	render: function() {
		console.log(this.state);
		return (
			<div id="quizComponent">
				<QuizResults addResult={this.addResult} removeResult={this.removeResult} results={ this.state.results } />
				<QuizQuestions addQuestion={ this.addQuestion } questions={ this.state.questions } updateQuestion={ this.updateQuestion } />
			</div>
		);
	}
});
