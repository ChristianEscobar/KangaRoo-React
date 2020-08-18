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
	const [receivedDate, setReceivedDate] = React.useState(props.received);
	const [adoptedDate, setAdoptedDate] = React.useState(props.adopted);
	const [adoptionAgency, setAdoptionAgency] = React.useState(props.agency);

	const handleCancel = () => {
		props.setEdit(false);
	};

	const handleUpdate = async () => {
		const body = {
			Key: props.docAwskey,
			adoptionAgency,
			receivedDate,
			adoptedDate,
		};

		await fetch('/api/v1/fosters/update', {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		});
		props.setEdit(false);
		props.fetchData();
	};

	const handleReceivedDateChange = (date) => {
		setReceivedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleAdoptedDateChange = (date) => {
		setAdoptedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleAdoptionAgencyChange = (event) => {
		setAdoptionAgency(event.target.value);
	};

	return (
		<div>
			<Dialog
				fullWidth="true"
				maxWidth="xl"
				open={props.showDialog}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
				<DialogContent>
					<FosterForm
						adding={false}
						editing="true"
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
					<Button onClick={handleUpdate} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditFoster;
