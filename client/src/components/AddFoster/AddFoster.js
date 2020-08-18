import React from 'react';
import FosterForm from '../FosterForm/FosterForm';

const AddFoster = (props) => {
	return (
		<FosterForm
			adding={true}
			fetchData={props.fetchData}
			setSnackbarOpen={props.setSnackbarOpen}
			setSnackbarVariant={props.setSnackbarVariant}
			setSnackbarMessage={props.setSnackbarMessage}
		></FosterForm>
	);
};

export default AddFoster;
