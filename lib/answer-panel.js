var React = require('react');
var labels = require('../labels');

var AnswerPanel = module.exports = React.createClass({

	propTypes: {
		answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		title: React.PropTypes.string
	},

	render: function() {
		var answers = this.props.answers.map(function(answer, index){
			return (
				<label key={ index }>
					<span className="label">{ labels.answerTitle }</span>
					<input type="text"
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
