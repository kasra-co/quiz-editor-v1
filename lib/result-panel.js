var React = require("react");
var MediaInput = require("./media-input");
var _ = require("lodash");
var labels = require("../labels");

var ResultPanel = module.exports = React.createClass({
	displayName: "ResultPanel",

	getDefaultProps: function () {
		return {
			result: {}
		};
	},

	propTypes: {
		result: React.PropTypes.shape({
			title: React.PropTypes.string,
			text: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.string,
				caption: React.PropTypes.string,
			})
		}),
		updateResultTitle: React.PropTypes.func.isRequired,
		updateResultImage: React.PropTypes.func.isRequired,
		updateResultText: React.PropTypes.func.isRequired,
		updateResultMediaTitle: React.PropTypes.func,
		updateResultMediaAltText: React.PropTypes.func,
		updateResultMediaCaption: React.PropTypes.func,
	},

	setMediaTitle: function (event) {
		this.props.updateResult({
			media: _.merge(
				this.props.result && this.props.result.media || {},
				{ title: event.target.value }
			)
		});
	},

	setCaption: function (event) {
		this.props.updateResult({
			media: _.merge(
				this.props.result && this.props.result.media || {},
				{ caption: event.target.value }
			)
		});
	},

	setAltText: function (event) {
		this.props.updateResult({
			media: _.merge(
				this.props.result && this.props.result.media || {},
				{ altText: event.target.value }
			)
		});
	},

	render: function() {
		return (
			<div className="resultPanel">
				<label>
					<span className="label">{ labels.resultTitle }</span>
					<input type="text"
						onChange={ function(event) {
							this.props.updateResultTitle(event.target.value);
						}.bind(this)}
						value={ this.props.result? this.props.result.title: null } />
				</label>
				<label>
					<span className="label resultText">{ labels.resultText }</span>
					<textarea
						onChange={ function(event) {
							this.props.updateResultText(event.target.value);
						}.bind(this)}
						value={ this.props.result? this.props.result.text: null } />
				</label>
				<div className="clearfix">
					<h3 className="imageMetaLabel">{ labels.mediaMeta }</h3>
					<MediaInput
						imageSrc={ this.props.result && this.props.result.media && this.props.result.media.image }
						onChange={ this.props.updateResultImage }
						aspectRatio={ 1 }
						size={[ 180, 180 ]}/>
					<div className="mediaMeta">
						<label>
							<span className="label">{ labels.imageTitle }</span>
							<input type="text"
								onChange={ this.setMediaTitle }
								value={ this.props.result.media? this.props.result.media.title: null } />
						</label>
						<label>
							<span className="label">{ labels.altText }</span>
							<input type="text"
								onChange={ this.setAltText }
								value={ this.props.result.media? this.props.result.media.altText: null } />
						</label>
						<label>
							<span className="label">{ labels.caption }</span>
							<input type="text"
								onChange={  this.setCaption }
								value={ this.props.result.media? this.props.result.media.caption: null } />
						</label>
					</div>
				</div>
			</div>
		);
	}
});
