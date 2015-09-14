var users = require('../../app/controllers/users.server.controller');

module.exports = function(app){
	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.param('userId', users.userByID);
	// this tells the router to use the users.userByID function before executing any other piece of middleware registered wtih the userId parameter

};

// this is going to use the controller for users