var React = require("react");
var _ = require("lodash");
var labels = require("../labels");

var ExtendableTabView = require("tab-component").ExtendableTabView;
var ResultPanel = require("./result-panel");

var QuizResults = module.exports = React.createClass({
	displayName: "QuizPanel",

	propTypes: {
		results: React.PropTypes.arrayOf(React.PropTypes.shape({
			title: React.PropTypes.string,
			text: React.PropTypes.string,
			media: React.PropTypes.shape({
				image: React.PropTypes.string,
				credit: React.PropTypes.string,
			})
		}))
	},

	getInitialState: function () {
		return {
			open: true
		};
	},

	expandCollapse: function(){
		this.setState ({
			open: !this.state.open
		});
	},

	render: function() {
		var resultPanels = this.props.results.map( function (result, index) {
			var updateResultTitle = function (title) {
				this.props.updateResult(_.merge(result, {title: title}), index);
			}.bind(this);
			var updateResultImage = function (imageSrc) {
				this.props.updateResult(_.merge(
					result, {
						media: _.merge(
							result.media || {}, {
								image: imageSrc
							}
						)
					}
				), index);
			}.bind(this);
			var updateResultText = function (text) {
				this.props.updateResult(_.merge(result, {text: text}), index);
			}.bind(this);
			var updateResultCredit = function (credit) {
				this.props.updateResult(_.merge(result, {credit: credit}), index);
			}.bind(this);
			return (
				<ResultPanel
					result={ result }
					updateResultImage={ updateResultImage }
					updateResultTitle={ updateResultTitle }
					updateResultText={ updateResultText }
					updateResultCredit={ updateResultCredit }
					key={ index } />
			);
		}.bind(this));
		var resultBlockBody = (
			<div>
				<ExtendableTabView
					tabLabels={ _.range(this.props.results.length ).map(function (n){
						return n + 1;
					}) }
					resultTitle={ this.props.results.map( function(result) { return result.title; }) }
					createPanel={ this.props.addResult }
					removePanel={ this.props.removeResult }
					tabPanels={ resultPanels }
					deletePanel={ <i className="icon-cancel-circled"></i> }
					initialSelection={ 0 } />
			</div>
		);
		return (
			<div id="quizResults" className={ "editorBlock " + (this.state && this.state.open? "open" : "")}>
				<a onClick={this.expandCollapse} className={"caret " + (this.state && this.state.open? "open" : "")}><span></span></a>
				<h2 className="editorSubHeading">{ labels.resultPanelTitle }</h2>
				{ this.state && this.state.open? resultBlockBody: null }
			</div>
		);
	}
});
