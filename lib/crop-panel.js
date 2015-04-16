let React = require( "react" );
let SelectRect = require( "select-rect" );
let labels = require( "../labels" );

let CropPanel = module.exports = React.createClass({
	displayName: "CropPanel",

	propTypes: {
		originalSrc: React.PropTypes.string,
		onSelectRegion: React.PropTypes.func.isRequired,
		cancelCrop: React.PropTypes.func.isRequired,
		aspectRatio: React.PropTypes.number,
		minSize: React.PropTypes.arrayOf( React.PropTypes.number ).isRequired
	},

	render() {
		return (
			<div className="cropPreview">
				<SelectRect
					backgroundSrc={ this.props.originalSrc }
					updateSelection={ this.updateSelection }
					aspectRatio={ this.props.aspectRatio }
					minSize = { this.props.minSize }/>
				<button className="cropButton" onClick={ this.select } type="button">{ labels.crop }</button>
				<button onClick={ this.props.cancelCrop } type="button">{ labels.cancel }</button>
			</div>
		);
	},

	updateSelection( x0, y0, x1, y1 ) {
		this.setState({ x0, y0, x1, y1 });
	},

	select() {
		this.props.onSelectRegion({
			x: this.state.x0,
			y: this.state.y0,
			width: this.state.x1 - this.state.x0,
			height: this.state.y1 - this.state.y0
		});
	}
});
