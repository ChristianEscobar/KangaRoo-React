import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar/NavBar';
import AllFosters from '../components/AllFosters/AllFosters';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Fosters = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const componentIsMounted = useRef(true);

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
			getFosters();
		}
	}, []);

	async function fetchData() {
		setLoading(true);
		const response = await fetch(GET_FOSTERS_URL);
		setData(await response.json());
		setLoading(false);
	}

	return (
		<div>
			<NavBar />
			<AllFosters data={data} loading={loading} admin={false} />
		</div>
	);
};

export default Fosters;
