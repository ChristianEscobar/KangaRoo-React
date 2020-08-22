// const LocalStrategy = require('passport-local').Strategy;
// const aws = require('aws-sdk');

// aws.config.update({
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 	region: process.env.AWS_REGION,
// });

// const smClient = new aws.SecretsManager({
// 	apiVersion: '2017-10-17',
// });

// const secretId = 'KangaRooAdminUserAccount';
// const secretParams = { SecretId: secretId };

// function initialize(passport) {
// 	passport.use(
// 		new LocalStrategy(async (username, password, done) => {
// 			const smData = await smClient.getSecretValue(secretParams);
// 			const { username: awsUsername, password: awsPassword } = JSON.parse(
// 				smData
// 			);

// 			if (username === awsUsername && password === awsPassword) {
// 				return done(null, username);
// 			} else {
// 				return done(null, false, { message: 'Invalid username or password' });
// 			}
// 		})
// 	);

// 	passport.serializeUser((user, done) => {
// 		done(null, user);
// 	});
// 	passport.deserializeUser((id, done) => {
// 		console.log('deserialize -> ', id);
// 		done();
// 	});
// }

// module.exports = initialize;
