const express = require('express');
const router = express.Router();
const util = require('util');

const {
	fileUpload,
	docUpload,
	listDocs,
	getDoc,
	deleteDoc,
	signedURL,
} = require('../services/aws-s3');

const singleUpload = util.promisify(fileUpload.single('photo'));

router.post('/add', async (req, res) => {
	try {
		await singleUpload(req, res);

		const doc = {
			fosterName: req.body.fosterName,
			receivedDate: req.body.receivedDate,
			adoptedDate: req.body.adoptedDate,
			adoptionAgency: req.body.adoptionAgency,
			imageURL: req.file.location,
		};
		await docUpload(doc);

		return res.status(201).json({
			doc,
		});
	} catch (error) {
		return res.status(422).json({
			errors: [{ title: 'S3 Upload Error', detail: error.message }],
		});
	}
});

router.delete('/delete', async (req, res) => {
	try {
		// Start by retrieving the doc so we can get the image path
		const doc = await getDoc(req.body.Key);

		// Extract image path from imageURL
		const imagePath = decodeURI(
			doc.imageURL.substring(doc.imageURL.indexOf('images'))
		);

		const response = await deleteDoc([req.body.Key, imagePath]);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({
			errors: [{ title: 'S3 Delete Error', detail: error.message }],
		});
	}
});

router.put('/update', async (req, res) => {
	try {
		// Start by retrieving the doc
		const doc = await getDoc(req.body.Key);

		doc.receivedDate = req.body.receivedDate;
		doc.adoptedDate = req.body.adoptedDate;
		doc.adoptionAgency = req.body.adoptionAgency;

		await docUpload(doc, req.body.Key);

		return res.status(200).json({
			doc,
		});
	} catch (error) {
		return res.status(500).json({
			errors: [{ title: 'S3 Update Error', detail: error.message }],
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const data = await listDocs();

		// Filter out objects which pertain to images
		const contents = data.Contents.filter(
			(fileObj) => !fileObj.Key.includes('images')
		);

		const docs = [];
		await Promise.all(
			contents.map(async (obj) => {
				const doc = await getDoc(obj.Key);
				doc.aws_key = obj.Key;
				doc.lastModified = obj.LastModified;
				doc.lastModifiedMillis = Date.parse(obj.LastModified);
				// docs.push(JSON.parse(Buffer.from(doc.Body, 'base64').toString('utf8')));
				docs.push(doc);
			})
		);

		// Sort results by last modified
		docs.sort(function (a, b) {
			return a.lastModifiedMillis - b.lastModifiedMillis;
		});

		return res.status(200).json({ docs });
	} catch (error) {
		return res.status(422).json({
			errors: [{ title: 'S3 Read Error', detail: error.message }],
		});
	}
});

module.exports = router;
