import { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchURL = async () => {
			const response = await fetch(url);
			setData(await response.json());
			setLoading(false);
		};

		fetchURL();
	}, []);

	return [data, loading];
}
export default useFetch;
