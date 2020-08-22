const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const fosterRoutes = require('./routes/fosters');
const loginRoutes = require('./routes/login')(passport);
const pingRoutes = require('./routes/ping');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
require('./auth/passport.js')(app, passport);

app.use('/api/v1/fosters', fosterRoutes);
app.use('/api/v1/auth', loginRoutes);
app.use('/api/v1/', pingRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
