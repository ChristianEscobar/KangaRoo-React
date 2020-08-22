module.exports = function (app, passport) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	require('./local.strategy')(passport);
};
