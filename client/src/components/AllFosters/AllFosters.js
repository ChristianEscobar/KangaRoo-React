import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import FosterCard from '../FosterCard/FosterCard';
import useFetch from './hooks';

const AllFosters = () => {
	const [data, loading] = useFetch('/api/v1/fosters');

	if (loading) {
		return (
			<Alert variant="filled" severity="info">
				Loading...
			</Alert>
		);
	}

	if (data.errors) {
		return (
			<Alert variant="filled" severity="error">
				<AlertTitle>Unable to load data</AlertTitle>
				{`${data.errors[0].title} | ${data.errors[0].detail}`}
			</Alert>
		);
	}

	return (
		<Grid container spacing={3}>
			{data.docs.map((dataObj, index) => (
				<Grid key={index} item xs={3}>
					<FosterCard
						cardPhotoURL={dataObj.signedURL}
						fosterName={dataObj.fosterName}
						received={dataObj.receivedDate}
						agency={dataObj.fromAgency}
						adopted={dataObj.adoptedDate}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default AllFosters;
