import React, { useState, useEffect, useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import AllFostersAdmin from '../components/AllFostersAdmin/AllFostersAdmin';
import AddFoster from '../components/AddFoster/AddFoster';
import NavBarAdmin from '../components/NavBarAdmin/NavBarAdmin';
import { UserContext } from '../contexts/UserContext';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Admin = (props) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

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

	async function fetchData() {
		setLoading(true);
		const response = await fetch(GET_FOSTERS_URL);
		setData(await response.json());
		setLoading(false);
	}

	if (!user || !user.authenticated) {
		return <Redirect to={{ pathname: '/login' }} />;
	}

	return (
		<div>
			<NavBarAdmin
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
			<AddFoster
				fetchData={fetchData}
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
			<AllFostersAdmin
				data={data}
				loading={loading}
				fetchData={fetchData}
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
			<br />
			<br />
		</div>
	);
};

export default Admin;
