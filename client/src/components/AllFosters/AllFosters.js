import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import FosterCard from '../FosterCard/FosterCard';
import FosterCardActions from '../FosterCardActions/FosterCardActions';

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
						facebook={dataObj.facebook}
						instagram={dataObj.instagram}
						comments={dataObj.comments}
					/>
					<br />
					<FosterCardActions
						docAwsKey={dataObj.docAwsKey}
						imageAwsKey={dataObj.imageAwsKey}
						photoURL={dataObj.signedURL}
						fosterName={dataObj.fosterName}
						receivedDate={dataObj.receivedDate}
						adoptedDate={dataObj.adoptedDate}
						adoptionAgency={dataObj.adoptionAgency}
						facebook={dataObj.facebook}
						instagram={dataObj.instagram}
						comments={dataObj.comments}
						fetchData={props.fetchData}
						setSnackbarOpen={props.setSnackbarOpen}
						setSnackbarVariant={props.setSnackbarVariant}
						setSnackbarMessage={props.setSnackbarMessage}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default AllFosters;
