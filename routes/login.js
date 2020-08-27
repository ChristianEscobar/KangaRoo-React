const express = require('express');
const router = express.Router();

const authRouter = function (passport) {
	router.post(
		'/login',
		// passport.authenticate('local', {
		// 	successRedirect: '/admin',
		// 	failureRedirect: '/login',
		// 	failureFlash: true,
		// })
		passport.authenticate('local'),
		(req, res, next) => {
			if (req.user) {
				res.status(200).json(req.user);
			} else {
				//handle errors here, decide what you want to send back to your front end
				//so that it knows the user wasn't found
				res.statusCode = 503;
				res.send({ message: 'Not Found' });
			}
		}
	);

	router.get('/user', async (req, res) => {
		async function getUser() {
			if (req.user) {
				return {
					success: true,
					message: 'user has been authenticated',
					username: req.user.username,
					cookies: req.cookies,
				};
			}

			return {
				success: false,
				message: 'user has not been authenticated',
				username: null,
				cookies: null,
			};
		}

		getUser().then((value) => res.json(value));
	});

	return router;
};

module.exports = authRouter;
