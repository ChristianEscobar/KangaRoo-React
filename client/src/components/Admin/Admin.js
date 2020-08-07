import React, { useState, useEffect } from 'react';
import AllFosters from '../AllFosters/AllFosters';
import AddFoster from '../AddFoster/AddFoster';

const FOSTERS_URL = '/api/v1/fosters';

const Admin = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		async function getFosters() {
			await fetchData();
		}

		await getFosters();
	}, []);

	async function fetchData() {
		setLoading(true);
		const response = await fetch(FOSTERS_URL);
		setData(await response.json());
		setLoading(false);
	}

	return (
		<div>
			<AddFoster fetchData={fetchData} />
			<br />
			<AllFosters data={data} loading={loading} fetchData={fetchData} />
		</div>
	);
};

export default Admin;
