var React = require("react");
var MediaInput = require("./media-input");
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
		updateResultCaption: React.PropTypes.func,
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
					<span className="label">{ labels.resultText }</span>
					<input type="text"
						onChange={ function(event) {
							this.props.updateResultText(event.target.value);
						}.bind(this)}
						value={ this.props.result? this.props.result.text: null } />
				</label>
				<div className="clearfix">
					<span className="label mediaLabel">{ labels.media }</span>
					<MediaInput
						imageSrc={ this.props.result && this.props.result.media && this.props.result.media.image || "images/croppedImagePlaceholder.jpg" }
						onChange={ this.props.updateResultImage }
						aspectRatio={ 1 }
						minSize={[ 180, 180 ]}/>
				</div>
			</div>
		);
	}
});
