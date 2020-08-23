const express = require('express');
const router = express.Router();

const authRouter = function (passport) {
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
