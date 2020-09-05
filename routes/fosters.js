const express = require('express');
const router = express.Router();
const util = require('util');

const {
	fileUpload,
	fileUpdate,
	docUpload,
	listDocs,
	getDoc,
	deleteDoc,
} = require('../services/aws-s3');

const validateRequiredInput = (req) => {
	if (
		!req.body.fosterName ||
		!req.body.adoptionAgency ||
		!req.body.receivedDate
	) {
		return false;
	}

	return true;
};

router.post('/add', fileUpload.single('photo'), async (req, res) => {
	try {
		if (!validateRequiredInput(req)) {
			throw new Error('Missing required input');
		}

		// await singleImageUpload(req, res);

		const doc = {
			fosterName: req.body.fosterName,
			adoptionAgency: req.body.adoptionAgency,
			receivedDate: req.body.receivedDate,
			adoptedDate: req.body.adoptedDate,
			facebook: req.body.facebook,
			instagram: req.body.instagram,
			comments: req.body.comments,
			imageURL: req.file.location,
			imageKey: req.file.key,
		};
		await docUpload(doc);

		res.status(201).json({
			doc,
		});
	} catch (error) {
		console.error(error.message);
		res.status(422).json({
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
		res.status(200).json(response);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			errors: [{ title: 'S3 Delete Error', detail: error.message }],
		});
	}
});

router.put('/update', fileUpdate.single('photo'), async (req, res) => {
	try {
		if (!validateRequiredInput(req)) {
			throw new Error('Missing required input');
		}

		const {
			docAwsKey,
			fosterName,
			receivedDate,
			adoptedDate,
			adoptionAgency,
			facebook,
			instagram,
			comments,
		} = req.body;

		const doc = await getDoc(docAwsKey);
		doc.fosterName = fosterName;
		doc.receivedDate = receivedDate;
		doc.adoptedDate = adoptedDate;
		doc.adoptionAgency = adoptionAgency;
		doc.facebook = facebook;
		doc.instagram = instagram;
		doc.comments = comments;
		doc.imageURL = req.file ? req.file.location : doc.imageURL;

		await docUpload(doc, docAwsKey);

		res.status(200).json({
			doc,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			title: 'S3 Update Error',
			detail: error.message,
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
				doc.imageAwsKey = doc.imageKey;
				doc.docAwsKey = obj.Key;
				doc.lastModified = obj.LastModified;
				doc.lastModifiedMillis = Date.parse(obj.LastModified);
				docs.push(doc);
			})
		);

		// Sort results by last modified
		docs.sort(function (a, b) {
			return a.lastModifiedMillis - b.lastModifiedMillis;
		});

		res.status(200).json({ docs });
	} catch (error) {
		console.error(error.message);
		res.status(422).json({
			errors: [{ title: 'S3 Read Error', detail: error.message }],
		});
	}
});

module.exports = router;
