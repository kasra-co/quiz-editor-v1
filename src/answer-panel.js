var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var AnswerPanel = module.exports = React.createClass({
	displayName: "AnswerPanel",

	propTypes: {
		answers: React.PropTypes.arrayOf( React.PropTypes.string ).isRequired,
		title: React.PropTypes.string,
		updateAnswer: React.PropTypes.func.isRequired
	},

	render: function() {
		var answers = this.props.answers.map(function(answer, index){
			var setAnswer = function (event) {
				var answers = _.clone(this.props.answers);
				answers[index] = event.target.value;
				this.props.updateAnswer(answers);
			}.bind(this);
			return (
				<label key={ index }>
					<span className="label">{ this.props.resultTitles[index] }</span>
					<input
						type="text"
						onChange={ setAnswer }
						value={ answer } />
				</label>
			);
		}.bind(this));
		return (
			<div className="answerPanel">
				<p>{ this.props.title }</p>
				{ answers }
			</div>
		);
	}

});
