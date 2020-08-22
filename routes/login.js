const express = require('express');
const router = express.Router();

const authRouter = function (passport) {
	// router.post('/login', (req, res, next) => {
	// 	passport.authenticate('local', (err, user, info) => {
	// 		if (err) {
	// 			console.log(err);
	// 			throw err;
	// 		}

	// 		if (!user) {
	// 			console.log('no user');
	// 			res.send('User does not exist');
	// 		} else {
	// 			req.logIn(user, (err) => {
	// 				if (err) {
	// 					console.log(err);
	// 					throw err;
	// 				}

	// 				console.log('success');
	// 				res.send('Successfully Authenticated');
	// 				console.log(req.user);
	// 			});
	// 		}
	// 	});
	// });

	router.post(
		'/login',
		passport.authenticate('local', {
			successRedirect: '/admin',
			failureRedirect: '/login',
			failureFlash: true,
		})
	);

	router.get('/user', (req, res) => {
		res.send(req.user);
	});

	return router;
};

module.exports = authRouter;
