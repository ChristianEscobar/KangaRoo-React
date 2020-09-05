import React, { useState, useEffect, useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper/SnackbarContentWrapper';
import AllFosters from '../components/AllFosters/AllFosters';
import AddFoster from '../components/AddFoster/AddFoster';
import NavBarAdmin from '../components/NavBarAdmin/NavBarAdmin';
import { UserContext } from '../contexts/UserContext';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Admin = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarVariant, setSnackbarVariant] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const componentIsMounted = useRef(true);
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		// each useEffect can return a cleanup function
		return () => {
			componentIsMounted.current = false;
		};
	}, []);

	useEffect(() => {
		async function getFosters() {
			await fetchData();
		}
		if (componentIsMounted.current) {
			if (user && user.authenticated) {
				getFosters();
			}
		}
	}, []);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	async function fetchData() {
		setLoading(true);
		const response = await fetch(GET_FOSTERS_URL);
		setData(await response.json());
		setLoading(false);
	}

	// if (!user || !user.authenticated) {
	// 	return <Redirect to={{ pathname: '/login' }} />;
	// }

	return (
		<div>
			<NavBarAdmin />
			<AddFoster
				fetchData={fetchData}
				setSnackbarOpen={setSnackbarOpen}
				setSnackbarVariant={setSnackbarVariant}
				setSnackbarMessage={setSnackbarMessage}
			/>
			<AllFosters
				data={data}
				loading={loading}
				fetchData={fetchData}
				setSnackbarOpen={setSnackbarOpen}
				setSnackbarVariant={setSnackbarVariant}
				setSnackbarMessage={setSnackbarMessage}
			/>

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
};

export default Admin;
