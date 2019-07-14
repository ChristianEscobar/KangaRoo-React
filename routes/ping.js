const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
	return res.status(200).json({
		message: 'The backend is alive and kicking'
	});
});

module.exports = router;
