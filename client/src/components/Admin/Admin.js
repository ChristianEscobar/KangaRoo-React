import React, { useState } from 'react';
import useFetch from './hooks';
import AllFosters from '../AllFosters/AllFosters';
import AddFoster from '../AddFoster/AddFoster';

const Admin = () => {
	const [data, loading] = useFetch('/api/v1/fosters');

	function handleNewUpload() {}

	return (
		<div>
			<AddFoster />
			<br />
			<AllFosters loading={loading} data={data} />
		</div>
	);
};

export default Admin;
