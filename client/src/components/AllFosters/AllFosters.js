import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import FosterCard from '../FosterCard/FosterCard';
import PhotoActions from '../PhotoActions/PhotoActions';

const AllFosters = (props) => {
	if (props.loading) {
		return (
			<Alert variant="filled" severity="info">
				Loading...
			</Alert>
		);
	}

	if (props.data.errors) {
		return (
			<Alert variant="filled" severity="error">
				<AlertTitle>Unable to load data</AlertTitle>
				{`${props.data.errors[0].title} | ${props.data.errors[0].detail}`}
			</Alert>
		);
	}

	if (props.data.docs.length === 0) {
		return (
			<div>
				<h4>You have not added any fosters yet... the world is waiting.</h4>
			</div>
		);
	}

	return (
		<Grid container spacing={3}>
			{props.data.docs.map((dataObj, index) => (
				<Grid key={index} item xs={3}>
					<FosterCard
						cardPhotoURL={dataObj.signedURL}
						fosterName={dataObj.fosterName}
						received={dataObj.receivedDate}
						agency={dataObj.adoptionAgency}
						adopted={dataObj.adoptedDate}
					/>
					<br />
					<PhotoActions
						awskey={dataObj.aws_key}
						fosterName={dataObj.fosterName}
						received={dataObj.receivedDate}
						adopted={dataObj.adoptedDate}
						agency={dataObj.adoptionAgency}
						fetchData={props.fetchData}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default AllFosters;
