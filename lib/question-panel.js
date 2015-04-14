var React = require("react");
var labels = require("../labels");
var _ = require("lodash");
var MediaInput = require("./media-input");

var QuestionPanel = module.exports = React.createClass({
	displayName: "QuestionPanel",

	getDefaultProps: function () {
		return {
			question: {}
		};
	},

	propTypes: {
		question: React.PropTypes.shape({
			prompt: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.string,
				credit: React.PropTypes.string,
			})
		}),
		updateQuestion: React.PropTypes.func.isRequired
	},

	setTitle: function (event) {
		this.props.updateQuestion(_.merge( this.props.question && this.props.question, { prompt: event.target.value }));
	},
	setCredit: function (event) {
		this.props.updateQuestion(_.merge( this.props.question && this.props.question.media, { credit: event.target.value }));
	},
	setImage: function (imageSrc) {
		this.props.updateQuestion({
			media: _.merge( this.props.question && this.props.question.media || {}, { image: imageSrc })
		});
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
				<div className="clearfix">
					<span className="label mediaLabel">{ labels.media }</span>
					<MediaInput
						imageSrc={ this.props.question && this.props.question.media && this.props.question.media.image }
						onChange={ this.setImage }
						aspectRatio={ 3 / 1 }/>
				</div>
				<label>
					<span className="label">{ labels.questionCredit }</span>
					<input type="text"
						onChange={ this.setCredit }
						value={ this.props.question.media? this.props.question.media.credit: null } />
				</label>
			</div>
		);
	}

});
