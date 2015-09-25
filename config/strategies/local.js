var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            return done(null, user);
        });
    }));
};

// the preceding code begins by requiring the Passport module, the local strategy module's Strategy object
// and your User Mongoose model.

// Then you register the strategy using the passport.use() method that uses an instance of the LocalStrategy
// object. Notice how the LocalStrategy constructor takes a callback function as an argument.

// The callback function accepts three arguments --username, password, and a done callback.
// Inside the callback function, you will use the User Mongoose model to find a user with that username
// and try to authenticate it. In the event of an error, you will pass the error object to the done callback.
// When the user is authenticated, you will call the done callback with the user Mongoose object.