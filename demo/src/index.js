var React = require( 'react' );

// Require index.js from the root of the project. That is where our module's interface is specified.
var Quiz = require('../..').Quiz;


React.render( <Quiz />, document.body );
