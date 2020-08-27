import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper/SnackbarContentWrapper';
import AllFosters from '../components/AllFosters/AllFosters';
import AddFoster from '../components/AddFoster/AddFoster';
import { Redirect } from 'react-router-dom';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Admin = (props) => {
	console.log('in admin ', props);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarVariant, setSnackbarVariant] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(() => {
		async function getFosters() {
			await fetchData();
		}
		if (props.authenticated) {
			console.log('before getFosters');
			getFosters();
		}
	}, [data]);

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

	if (!props.location.authenticated) {
		console.log('redirecting to login');
		return <Redirect to={{ pathname: '/login' }} />;
	}

	return (
		<div>
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
