const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3Bucket = `kangaroo-thekitty-${process.env.NODE_ENV}`;

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION,
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid Mime Type, only JPEG and PNG are allowed'), false);
	}
};

const fileUpload = multer({
	fileFilter,
	storage: multerS3({
		s3,
		bucket: `${s3Bucket}/images`,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: `foster_photo` });
		},
		key: function (req, file, cb) {
			cb(
				null,
				`${req.body.fosterName}-${req.body.fromAgency.replace(
					/\s+/g,
					''
				)}-${Date.now().toString()}`
			);
		},
	}),
});

const docUpload = async (doc) => {
	const params = {
		Bucket: s3Bucket,
		Key: `${doc.fosterName}-${doc.fromAgency}-${Date.now().toString()}`,
		Body: JSON.stringify(doc),
	};

	return s3.putObject(params).promise();
};

const listDocs = async () => {
	const params = {
		Bucket: s3Bucket,
		MaxKeys: 1000,
	};

	return s3.listObjectsV2(params).promise();
};

const getDoc = async (key) => {
	const params = {
		Bucket: s3Bucket,
		Key: key,
	};

	const docBuffer = await s3.getObject(params).promise();
	const docObj = JSON.parse(
		Buffer.from(docBuffer.Body, 'base64').toString('utf8')
	);
	if (docObj.imageURL) {
		docObj.signedURL = await signedURL(docObj.imageURL);
	}
	return docObj;
};

const deleteDoc = async (arrayOfKeys) => {
	// Delete both the doc and associated image
	const objects = [
		{
			Key: arrayOfKeys[0],
		},
		{
			Key: arrayOfKeys[1],
		},
	];

	const params = {
		Bucket: s3Bucket,
		Delete: {
			Objects: objects,
		},
	};

	const result = await s3.deleteObjects(params).promise();
	return result;
};

const signedURL = async (awsURL) => {
	const key = decodeURI(awsURL.slice(awsURL.indexOf('images')));
	const params = { Bucket: s3Bucket, Key: key };

	return new Promise((resolve, reject) => {
		s3.getSignedUrl('getObject', params, function (err, url) {
			if (err) {
				reject(err);
			}

			resolve(url);
		});
	});
};

module.exports = {
	fileUpload,
	docUpload,
	listDocs,
	getDoc,
	signedURL,
	deleteDoc,
};
