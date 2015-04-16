var React = require("react");
var labels = require("../labels");
var _ = require("lodash");
var MediaInput = require("./media-input");

var QuestionPanel = module.exports = React.createClass({
	displayName: "QuestionPanel",

	getInitialState: function () {
		return {
			metaOpen: true
		};
	},

	expandCollapse: function(){
		this.setState ({
			metaOpen: !this.state.metaOpen
		});
	},

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

	setCaption: function (event) {
		this.props.updateQuestion({
			media: _.merge(
				this.props.question && this.props.question.media || {},
				{ caption: event.target.value }
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
		var mediaMeta;
		if (this.props.question.media && this.props.question.media.image ) {
			mediaMeta = (
					<div className="mediaMeta">
						<a onClick={this.expandCollapse} className={"caret " + (this.state && this.state.metaOpen? "open" : "")}><span></span></a>
						<h3>{ labels.mediaMeta }</h3>

					</div>
			);
		}
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
						media={ this.props.question.media }
						aspectRatio={ 3 / 1 }
						minSize={[ 600, 200 ]}/>
					{ mediaMeta }
				</div>
			</div>
		);
	}

});
