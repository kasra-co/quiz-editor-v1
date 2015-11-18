let React = require( "react" );
let imageReader = require( "./image-reader" );

let ImageFileSelector = module.exports = React.createClass({
	displayName: "ImageFileSelector",

	propTypes: {
		onSelect: React.PropTypes.func.isRequired
	},

	render() {
		return (
			<div className="fileUpload">
				<input type="file" className="imageUpload" onChange={ imageReader( this.props.onSelect ) }/>
				<button type="button" className="editorSecondaryBtn">
					<i className="icon-upload-cloud"></i>
				</button>
			</div>
		);
	}
});

