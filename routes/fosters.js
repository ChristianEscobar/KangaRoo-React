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

const singleImageUpload = util.promisify(fileUpload.single('photo'));
const singleImageUpdate = util.promisify(fileUpdate.single('photo'));

const getImageKey = (imageURL) => {
	return imageURL.substring(imageURL.indexOf('images/') + 7);
};

router.post('/add', async (req, res) => {
	try {
		await singleImageUpload(req, res);

		const doc = {
			fosterName: req.body.fosterName,
			adoptionAgency: req.body.adoptionAgency,
			receivedDate: req.body.receivedDate,
			adoptedDate: req.body.adoptedDate,
			facebook: req.body.facebook,
			instagram: req.body.instagram,
			comments: req.body.comments,
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
		console.log('body -> ', req.body);
		console.log('file -> ', req.file);
		await singleImageUpdate(req, res);
		console.log('file -> ', req.file);

		const doc = await getDoc(req.body.Key);
		doc.fosterName = req.body.fosterName;
		doc.receivedDate = req.body.receivedDate;
		doc.adoptedDate = req.body.adoptedDate;
		doc.adoptionAgency = req.body.adoptionAgency;
		doc.facebook = req.body.facebook;
		doc.instagram = req.body.instagram;
		doc.comments = req.body.comments;
		doc.imageURL = req.file.location;

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
				doc.imageAwsKey = getImageKey(doc.imageURL);
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

		return res.status(200).json({ docs });
	} catch (error) {
		return res.status(422).json({
			errors: [{ title: 'S3 Read Error', detail: error.message }],
		});
	}
});

module.exports = router;
