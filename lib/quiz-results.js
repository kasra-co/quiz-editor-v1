"use strict";

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
				caption: React.PropTypes.string
			})
		}))
	},

	getInitialState: function getInitialState() {
		return {
			open: true
		};
	},

	expandCollapse: function expandCollapse() {
		this.setState({
			open: !this.state.open
		});
	},

	render: function render() {
		var resultPanels = this.props.results.map((function (result, index) {

			var updateThisResult = (function (resultChange) {
				this.props.updateResult(_.merge(result, resultChange), index);
			}).bind(this);

			return React.createElement(ResultPanel, {
				result: result,
				updateResult: updateThisResult,
				key: index });
		}).bind(this));
		var resultBlockBody = React.createElement(
			"div",
			null,
			React.createElement(ExtendableTabView, {
				tabLabels: _.range(this.props.results.length).map(function (n) {
					return n + 1;
				}),
				resultTitle: this.props.results.map(function (result) {
					return result.title;
				}),
				createPanel: this.props.addResult,
				removePanel: this.props.removeResult,
				tabPanels: resultPanels,
				deletePanel: React.createElement("i", { className: "icon-cancel-circled" }),
				initialSelection: 0 })
		);
		return React.createElement(
			"div",
			{ id: "quizResults", className: "editorBlock " + (this.state && this.state.open ? "open" : "") },
			React.createElement(
				"a",
				{ onClick: this.expandCollapse, className: "caret " + (this.state && this.state.open ? "open" : "") },
				React.createElement("span", null)
			),
			React.createElement(
				"h2",
				{ className: "editorSubHeading" },
				labels.resultPanelTitle
			),
			this.state && this.state.open ? resultBlockBody : null
		);
	}
});