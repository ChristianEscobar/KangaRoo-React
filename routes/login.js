const express = require('express');
const router = express.Router();

const authRouter = function (passport) {
	router.post('/login', passport.authenticate('local'), (req, res, next) => {
		if (req.user) {
			res.status(200).json(req.user);
		} else {
			//handle errors here, decide what you want to send back to your front end
			//so that it knows the user wasn't found
			res.statusCode = 503;
			res.send({ message: 'Not Found' });
		}
	});

	router.get('/user', async (req, res) => {
		const userData = {
			authenticated: false,
			message: 'user has not been authenticated',
			username: null,
		};

		if (req.user) {
			userData.authenticated = true;
			userData.message = 'user has been authenticated';
			userData.username = req.user.username;
		}
		res.json(userData);
	});

	return router;
};

module.exports = authRouter;
