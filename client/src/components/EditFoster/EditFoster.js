import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import FosterForm from '../FosterForm/FosterForm';

const EditFoster = (props) => {
	const handleCancel = () => {
		props.setEdit(false);
	};

	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth="xl"
				open={props.showDialog}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
				<DialogContent>
					<FosterForm
						fetchData={props.fetchData}
						setEdit={props.setEdit}
						adding={false}
						docAwsKey={props.docAwsKey}
						imageAwsKey={props.imageAwsKey}
						photoURL={props.photoURL}
						fosterName={props.fosterName}
						adoptionAgency={props.adoptionAgency}
						receivedDate={props.receivedDate}
						adoptedDate={props.adoptedDate}
						facebook={props.facebook}
						instagram={props.instagram}
						comments={props.comments}
						setSnackbarOpen={props.setSnackbarOpen}
						setSnackbarVariant={props.setSnackbarVariant}
						setSnackbarMessage={props.setSnackbarMessage}
					></FosterForm>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditFoster;
