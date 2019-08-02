const express = require('express');
const router = express.Router();
const util = require('util');

const {
	fileUpload,
	docUpload,
	listDocs,
	getDoc,
	signedURL
} = require('../services/aws-s3');

const singleUpload = util.promisify(fileUpload.single('photo'));

router.post('/add', async (req, res) => {
	try {
		await singleUpload(req, res);
		// const imageURL = await signedURL(req.file.location);
		const doc = {
			fosterName: req.body.fosterName,
			receivedDate: req.body.receivedDate,
			adoptedDate: req.body.adoptedDate,
			fromAgency: req.body.fromAgency,
			imageURL: req.file.location
		};
		await docUpload(doc);

		return res.status(201).json({
			doc
		});
	} catch (err) {
		return res.status(422).json({
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
