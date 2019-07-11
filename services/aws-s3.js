const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3Bucket = `kangaroo-thekitty-${process.env.NODE_ENV}`;

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION
});

const s3 = new aws.S3();

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
		metadata: function(req, file, cb) {
			cb(null, { fieldName: 'TESTING_METADATA' });
		},
		key: function(req, file, cb) {
			cb(
				null,
				`${req.body.name}-${req.body.from.replace(
					/\s+/g,
					''
				)}-${Date.now().toString()}`
			);
		}
	})
});

const docUpload = async (doc, filename) => {
	const params = {
		Bucket: s3Bucket,
		Key: `${filename}-${Date.now().toString()}`,
		Body: JSON.stringify(doc)
	};

	return s3.putObject(params).promise();
};

const listDocs = async () => {
	const params = {
		Bucket: s3Bucket,
		MaxKeys: 1000
	};

	return s3.listObjectsV2(params).promise();
};

const getDoc = async key => {
	const params = {
		Bucket: s3Bucket,
		Key: key
	};

	return s3.getObject(params).promise();
};

module.exports = { fileUpload, docUpload, listDocs, getDoc };
