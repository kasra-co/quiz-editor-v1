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
				caption: React.PropTypes.string,
			})
		}).isRequired,
		updateQuestion: React.PropTypes.func.isRequired
	},

	setTitle: function (event) {
		this.props.updateQuestion( _.merge(
			this.props.question, {
				prompt: event.target.value
			}
		));
	},

	setMediaTitle: function (event) {
		this.props.updateQuestion({
			media: _.merge(
				this.props.question && this.props.question.media || {},
				{ title: event.target.value }
			)
		});
	},

	setCaption: function (event) {
		this.props.updateQuestion({
			media: _.merge(
				this.props.question && this.props.question.media || {},
				{ caption: event.target.value }
			)
		});
	},

	setAltText: function (event) {
		this.props.updateQuestion({
			media: _.merge(
				this.props.question && this.props.question.media || {},
				{ altText: event.target.value }
			)
		});
	},

	setImage: function (imageSrc) {
		this.props.updateQuestion({
			media: _.merge(
				this.props.question && this.props.question.media || {},
				{ image: imageSrc })
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
					<h3 className="imageMetaLabel">{ labels.mediaMeta }</h3>
					<MediaInput
						imageSrc={ this.props.question && this.props.question.media && this.props.question.media.image }
						onChange={ this.setImage }
						media={ this.props.question.media }
						aspectRatio={ 3 / 1 }
						size={[ 600, 200 ]}/>
					<div className="mediaMeta">
						<label>
							<span className="label">{ labels.title }</span>
							<input type="text"
								onChange={ this.setMediaTitle }
								value={ this.props.question.media? this.props.question.media.title: null } />
						</label>
						<label>
							<span className="label">{ labels.altText }</span>
							<input type="text"
								onChange={ this.setAltText }
								value={ this.props.question.media? this.props.question.media.altText: null } />
						</label>
						<label>
							<span className="label">{ labels.caption }</span>
							<input type="text"
								onChange={ this.setCaption }
								value={ this.props.question.media? this.props.question.media.caption: null } />
						</label>
					</div>
				</div>
			</div>
		);
	}

});
