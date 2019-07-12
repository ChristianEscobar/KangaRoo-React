const express = require('express');
const router = express.Router();
const util = require('util');

const {
	fileUpload,
	docUpload,
	listDocs,
	getDoc
} = require('../services/aws-s3');

const singleUpload = util.promisify(fileUpload.single('photo'));

router.post('/add', async (req, res) => {
	try {
		await singleUpload(req, res);
		const doc = {
			body: req.body,
			imageUrl: req.file.location
		};
		await docUpload(doc, req.body.name);

		return res.status(201).json({
			body: req.body,
			imageUrl: req.file.location
		});
	} catch (err) {
		return res.status(422).send({
			errors: [{ title: 'S3 Upload Error', detail: err.message }]
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const data = await listDocs();
		const contents = data.Contents.filter(
			fileObj => !fileObj.Key.includes('images')
		);
		const docs = [];
		await Promise.all(
			contents.map(async obj => {
				const doc = await getDoc(obj.Key);
				docs.push(JSON.parse(Buffer.from(doc.Body, 'base64').toString('utf8')));
			})
		);

		return res.status(200).json({ docs });
	} catch (err) {
		return res.status(422).send({
			errors: [{ title: 'S3 Read Error', detail: err.message }]
		});
	}
});

module.exports = router;