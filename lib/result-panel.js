var React = require('react');
var labels = require('../labels');

var ResultPanel = module.exports = React.createClass({

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
				image: React.PropTypes.object,
				credit: React.PropTypes.string,
				via: React.PropTypes.string
			})
		}),
		updateResultTitle: React.PropTypes.func.isRequired,
		updateResultText: React.PropTypes.func.isRequired,
		updateResultCredit: React.PropTypes.func,
		updateResultVia: React.PropTypes.func
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
				<label>
					<span className="label">{ labels.resultCredit }</span>
					<input type="text"
						onChange={ function(event) {
							this.props.updateResultCredit(event.target.value);
						}.bind(this)}
						value={ this.props.result.media? this.props.result.media.credit: null } />
				</label>
				<label>
					<span className="label">{ labels.resultVia }</span>
					<input type="text"
						onChange={ function(event) {
							this.props.updateResultVia(event.target.value);
						}.bind(this)}
						value={ this.props.result.media? this.props.result.media.via: null } />
				</label>
			</div>
		);
	}

});
