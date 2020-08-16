import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper/SnackbarContentWrapper';
import AllFosters from '../components/AllFosters/AllFosters';
import AddFoster from '../components/AddFoster/AddFoster';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Admin = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarVariant, setSnackbarVariant] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(async () => {
		(async function getFosters() {
			await fetchData();
		})();
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
