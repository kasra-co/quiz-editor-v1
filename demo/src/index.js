var React = require( 'react' );
var initialQuiz = require('./config/quiz.json');

// Require index.js from the root of the project. That is where our module's interface is specified.
var Quiz = require('../..').Quiz;


React.render(
	<Quiz
		initialQuiz={ initialQuiz }
		updateQuiz={ function( quiz ) {
			console.log( quiz );
		}} />, document.body );
