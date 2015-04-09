var React = require('react');
var _ = require('lodash');
var labels = require('../labels');

var TabView = require('tab-component').TabView;
var QuestionPanel = require('./question-panel');
var AnswerPanel = require('./answer-panel');

var QuizQuestions = module.exports = React.createClass({

	propTypes: {
		questions: React.PropTypes.arrayOf( React.PropTypes.shape({
			answers: React.PropTypes.arrayOf( React.PropTypes.string).isRequired
		})),
		updateQuestion: React.PropTypes.func.isRequired,
		addQuestion: React.PropTypes.func.isRequired
	},

	getInitialState: function () {
		return {
			open: true
		};
	},

	expandCollapse: function(){
		this.setState ({
			open: !this.state.open
		});
	},

	render: function() {
		var Questions = this.props.questions.map(function (question, index){
			var updateThisQuestion = function (question) {
				this.props.updateQuestion(question, index);
			}.bind(this);
			return (
				<TabView
					key={ index }
					initialSelection={0}
					tabLabels={ ['Question','Answers'] }
					tabPanels={ [<QuestionPanel question={ question } updateQuestion={ updateThisQuestion } />, <AnswerPanel resultTitles={ this.props.resultTitles } answers={ question.answers } title={ question.prompt } />]}
					deletePanel={
						<a className="deleteQuestion"><i className="icon-trash"></i>{ labels.deleteQuestion }</a>
					} />
			);
		}.bind(this));
		return (
			<div id="quizQuestions" className={ "editorBlock " + (this.state && this.state.open? "open" : "")}>
				<a onClick={this.expandCollapse} className={"caret " + (this.state && this.state.open? "open" : "")}><span></span></a>
				<h2 className="editorSubHeading">Your Questions</h2>
				{ Questions }
				<button id="addNewQuestion" className="editorSecondaryBtn" onClick={this.props.addQuestion}>{ labels.addNewQuestion }</button>
			</div>
		);
	}
});
