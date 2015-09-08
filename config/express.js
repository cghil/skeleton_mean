var express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

module.exports = function(){
	var app = express();

// process.env.NODE_ENV is used to determine the environment and configure the Express app accordingly


	if (process.env.NODE_ENV === 'development') {

		app.use(morgan('dev'));

	} else if (process.env.NODE_ENV === 'production'){
		// compress in production
		app.use(compress());

	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(methodOverride());

	require('../app/routes/index.server.routes.js')(app);

	return app;
};