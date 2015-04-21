var React = require( "react" );
var initialQuiz = require("./config/quiz.json");
var validators = require( "kasra-validators" );
var Joi = require( "joi" );

var labels = require("../../labels");
var Quiz = require("../..").Quiz;

var mediaSchema = Joi.object().keys({
	image: Joi.string().required(),
	title: Joi.string().required(),
	caption: Joi.string().required(),
	altText: Joi.string().required()
}).required();

var quizSchema = {
	questions: Joi.array().min(1).max(10).items(Joi.object().keys({
		prompt: Joi.string().required(),
		media: mediaSchema,
		answers: Joi.array().items(Joi.string().required()).required(),
	}).required()).required(),
	results: Joi.array().items(Joi.object().keys({
		title: Joi.string().required(),
		text: Joi.string().required(),
		media: mediaSchema
	}).required()).required(),
};

var Demo = React.createClass({
	render: function() {

		var errorMessage;
		if( this.state.error ) {
			errorMessage = (
				<div className={ "errorMessage open" }>
					<a className="close" onClick={ this.closeErrorMessage }><i className="icon-cancel"></i></a>
					<p>{ labels.errorMessage }</p>
					<h3>Error info</h3>
					<p>{ JSON.stringify( this.state.error, null, "\t" )}</p>
					<h3>Quiz data</h3>
					<p>{ JSON.stringify( this.state.quiz, null, "\t" )}</p>
				</div>
			);
		}

		return (
			<div>
				{ errorMessage }
				<Quiz
					quiz = { this.state.quiz }
					updateQuiz={ function( quiz ) {
						var result = Joi.validate( quiz, quizSchema );

						this.setState({
							error: result.error,
							quiz: quiz
						});
					}.bind( this )} />
			</div>
		);
	},

	getInitialState: function() {
		return {
			invalid: false,
			quiz: this.props.initialQuiz
		};
	}
});

React.render( <Demo initialQuiz={ initialQuiz }/>, document.body );
