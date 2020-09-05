import React, { useState, useMemo } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import SignIn from './components/SignIn/SignIn';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from './components/SnackbarContentWrapper/SnackbarContentWrapper';
import { UserContext } from './contexts/UserContext';
import './App.css';

function AppRouter() {
	const [user, setUser] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarVariant, setSnackbarVariant] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<div>
			<Router>
				<UserContext.Provider value={value}>
					<Route
						path="/login"
						exact
						render={() => (
							<SignIn
								setSnackbarOpen={setSnackbarOpen}
								setSnackbarVariant={setSnackbarVariant}
								setSnackbarMessage={setSnackbarMessage}
							/>
						)}
					/>
					<Route
						path="/admin"
						render={() => (
							<Admin
								setSnackbarOpen={setSnackbarOpen}
								setSnackbarVariant={setSnackbarVariant}
								setSnackbarMessage={setSnackbarMessage}
							/>
						)}
					/>
					<Route path="/" exact component={Home} />
				</UserContext.Provider>
			</Router>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<SnackbarContentWrapper
					onClose={handleSnackbarClose}
					variant={snackbarVariant}
					message={snackbarMessage}
				/>
			</Snackbar>
		</div>
	);
}

export default AppRouter;
