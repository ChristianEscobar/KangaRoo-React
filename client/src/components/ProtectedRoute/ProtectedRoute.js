import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const AUTH_URL = '/api/v1/auth/user';

const ProtectedRoute = (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const Component = props.component;

	useEffect(() => {
		let mounted = true;
		getAuthUser().then((result) => {
			if (mounted) {
				if (result.success) {
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			}
		});

		return () => (mounted = false);
	}, []);

	async function getAuthUser() {
		const response = await fetch(AUTH_URL, {
			method: 'GET',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true,
			},
		});

		const responseJson = await response.json();
		return responseJson;
	}

	if (authenticated) {
		return <Component />;
	}

	return <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
