import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from '../../contexts/UserContext';

const LOGIN_URL = '/api/v1/auth/login';
const USER_URL = '/api/v1/auth/user';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				KangaRooTheKitty
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [usernameHelperText, setUsernameHelperText] = useState('');
	const [passwordHelperText, setPasswordHelperText] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [redirectToAdminPage, setRedirectToAdminPage] = useState(false);

	const { user, setUser } = useContext(UserContext);

	const handleUsernameChange = (event) => {
		if (event.target.value.length === 0 || event.target.value === ' ') {
			setUsernameError(true);
			setUsername(event.target.value);
			setUsernameHelperText('Invalid username');
			setButtonDisabled(true);
		} else {
			setUsernameError(false);
			setUsername(event.target.value);
			setUsernameHelperText('');
			setButtonDisabled(false);
		}
	};

	const handlePasswordChange = (event) => {
		if (event.target.value.length === 0 || event.target.value === ' ') {
			setPasswordError(true);
			setPassword(event.target.value);
			setPasswordHelperText('Invalid password');
			setButtonDisabled(true);
		} else {
			setPasswordError(false);
			setPassword(event.target.value);
			setPasswordHelperText('');
			setButtonDisabled(false);
		}
	};

	const handleSignIn = async (event) => {
		try {
			if (event) {
				event.preventDefault();
				const loginResponse = await fetch(LOGIN_URL, {
					method: 'POST',
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'Access-Control-Allow-Credentials': true,
					},
					body: JSON.stringify({
						username,
						password,
					}),
				});

				if (!loginResponse.ok) {
					throw new Error(
						`Status:  ${loginResponse.status} Message: ${loginResponse.statusText}`
					);
				}

				// Get the user details
				const userResponse = await fetch(USER_URL, {
					method: 'GET',
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'Access-Control-Allow-Credentials': true,
					},
				});

				if (!userResponse.ok) {
					throw new Error(
						`Status:  ${userResponse.status} Message: ${userResponse.statusText}`
					);
				}

				const userResponseJson = await userResponse.json();
				setUser(userResponseJson);
				setRedirectToAdminPage(true);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const classes = useStyles();

	if (redirectToAdminPage) {
		return <Redirect to={{ pathname: '/admin' }} />;
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate method="post">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="User Name"
						name="username"
						value={username}
						error={usernameError}
						helperText={usernameHelperText}
						onChange={handleUsernameChange}
						autoComplete="username"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						error={passwordError}
						helperText={passwordHelperText}
						onChange={handlePasswordChange}
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSignIn}
						disabled={buttonDisabled}
					>
						Sign In
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
