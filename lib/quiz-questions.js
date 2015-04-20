var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var TabView = require("tab-component").TabView;
var QuestionPanel = require("./question-panel");
var AnswerPanel = require("./answer-panel");

var QuizQuestions = module.exports = React.createClass({
	displayName: "QuizQuestions",

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

			var updateThisQuestion = function ( questionChange ) {
				this.props.updateQuestion( _.merge( question, questionChange ), index );
			}.bind( this );

			var updateThisAnswer = function ( answers ) {
				this.props.updateQuestion( _.merge( question, { answers: answers }), index);
			}.bind(this);

			var removeQuestion = function() {
				this.props.removeQuestion( index );
			}.bind( this );

			var questionTabNumber = " " + ( index + 1 );

			return (
				<TabView
					key={ index }
					initialSelection={0}
					tabLabels={[ labels.questionTabLabel + "#" + questionTabNumber, labels.answerTabLabel ]}
					tabPanels={[
						<QuestionPanel
							removeQuestion={ this.props.removeQuestion }
							question={ question }
							updateQuestion={ updateThisQuestion } />,
						<AnswerPanel
							resultTitles={ this.props.resultTitles }
							updateAnswer={ updateThisAnswer }
							answers={ question.answers }
							title={ question.prompt } />
					]}
					removeQuestion={ removeQuestion }
					deletePanel={
						<a className="deleteQuestion"><i className="icon-trash"></i>{ labels.deleteQuestion }</a>
					} />
			);
		}.bind(this));

		var addNewQuestion;
		if ( this.props.questions.length <= 9) {
			addNewQuestion = <button type="button" id="addNewQuestion" className="editorSecondaryBtn" onClick={this.props.addQuestion}>{ labels.addNewQuestion }</button>;
		}
		var questionBlockBody = (
			<div>
				{ Questions }
				{ addNewQuestion }
			</div>
		);
		return (
			<div id="quizQuestions" className="editorBlock">
				<a onClick={this.expandCollapse} className={"caret " + (this.state && this.state.open? "open" : "")}><span></span></a>
				<h2 className="editorSubHeading">{ labels.questionPanelTitle }</h2>
				{ this.state && this.state.open? questionBlockBody: null }
			</div>
		);
	}
});
