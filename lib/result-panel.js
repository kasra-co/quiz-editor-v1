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
		})
	},

	render: function() {
		return (
			<div className="resultPanel">
				<label>
					<span className="label">{ labels.resultTitle }</span>
					<input type="text"
						value={ this.props.result? this.props.result.title: null } />
				</label>
				<label>
					<span className="label">{ labels.resultText }</span>
					<input type="text"
						value={ this.props.result? this.props.result.text: null } />
				</label>
				<label>
					<span className="label">{ labels.resultCredit }</span>
					<input type="text"
						value={ this.props.result.media? this.props.result.media.credit: null } />
				</label>
				<label>
					<span className="label">{ labels.resultVia }</span>
					<input type="text"
						value={ this.props.result.media? this.props.result.media.via: null } />
				</label>
			</div>
		);
	}

});
