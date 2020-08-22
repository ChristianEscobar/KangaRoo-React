// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION,
});

const smClient = new aws.SecretsManager({
	apiVersion: '2017-10-17',
});

const secretId = 'KangaRooAdminUserAccount';
const secretParams = { SecretId: secretId };

module.exports = function (passport) {
	console.log('in local-strategy');
	passport.use(
		new LocalStrategy(async function (username, password, done) {
			console.log('in LocalStrategy async');
			const user = {
				username,
				password,
			};

			try {
				console.log('extracting from SM');
				const smData = await smClient.getSecretValue(secretParams).promise();
				const { username: awsUsername, password: awsPassword } = JSON.parse(
					smData.SecretString
				);

				if (user.username === awsUsername && user.password === awsPassword) {
					console.log('creds are good');
					done(null, user);
				} else {
					console.log('creds did not match');
					done(null, false, { message: 'Incorrect username or password' });
				}
			} catch (error) {
				return done(error);
			}
		})
	);
};
