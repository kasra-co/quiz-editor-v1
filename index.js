/* This is the interface that we expose to the dependants of this module. It defines this module's interaction with the outside world.

It should only export objects from the ./lib directory.
*/

/* A simple message view. Props:
- children
- message: an optional message that will be shown above the child components.  */
exports.QuizResults = require( './lib/quiz-results' );
exports.QuizQuestions = require( './lib/quiz-questions' );
exports.ResultPanel = require( './lib/result-panel' );
exports.Quiz = require( './lib/quiz' );

/*
exports.storeName = {} OR exports.stores = {} if there are more than one
exports.actions = require( './lib/actions' );
*/
