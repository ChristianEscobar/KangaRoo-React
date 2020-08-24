import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
	const Component = props.component;
	const isAuthenticated = false;

	let returnThis;
	if (isAuthenticated) {
		return <Component />;
	}

	return <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
