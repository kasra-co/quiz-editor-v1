var React = require('react');
var labels = require('../labels');
var _ = require('lodash');

var QuestionPanel = module.exports = React.createClass({

	getDefaultProps: function () {
		return {
			question: {}
		};
	},

	propTypes: {
		question: React.PropTypes.shape({
			prompt: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.object,
				credit: React.PropTypes.string,
				via: React.PropTypes.string
			})
		}),
		updateQuestion: React.PropTypes.func.isRequired
	},

	setTitle: function (event) {
		this.props.updateQuestion(_.merge( this.props.question, { prompt: event.target.value }))
	},
	setCredit: function (event) {
		this.props.updateQuestion(_.merge( this.props.question.media, { credit: event.target.value }))
	},
	setVia: function (event) {
		this.props.updateQuestion(_.merge( this.props.question.media, { via: event.target.value }))
	},

	render: function() {
		return (
			<div className="questionPanel">
				<label>
					<span className="label">{ labels.questionTitle }</span>
					<input type="text"
						onChange={ this.setTitle }
						value={ this.props.question.prompt } />
				</label>
				<span className="label">{ labels.media }</span>
				<label>
					<span className="label">{ labels.questionCredit }</span>
					<input type="text"
						onChange={ this.setCredit }
						value={ this.props.question.media? this.props.question.media.credit: null } />
				</label>
				<label>
					<span className="label">{ labels.questionVia }</span>
					<input type="text"
						onChange={ this.setVia }
						value={ this.props.question.media? this.props.question.media.via: null } />
				</label>
			</div>
		);
	}

});
