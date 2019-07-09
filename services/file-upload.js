const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION
});

const s3 = new aws.S3({});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid Mime Type, only JPEG and PNG are allowed'), false);
	}
};

const upload = multer({
	fileFilter,
	storage: multerS3({
		s3,
		bucket: 'kangaroo-thekitty',
		metadata: function(req, file, cb) {
			cb(null, { fieldName: 'TESTING_METADATA' });
		},
		key: function(req, file, cb) {
			cb(null, Date.now().toString());
		}
	})
});

module.exports = upload;
