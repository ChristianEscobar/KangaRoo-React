import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

const EditFoster = (props) => {
	const [receivedDate, setReceivedDate] = React.useState(props.received);
	const [adoptedDate, setAdoptedDate] = React.useState(props.adopted);
	const [adoptionAgency, setAdoptionAgency] = React.useState(props.agency);

	const handleClose = () => {
		props.setEdit(false);
	};

	const handleSubmit = async () => {
		const body = {
			Key: props.awskey,
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
				open={props.showDialog}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Update stored details for {props.fosterName}
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="agency"
						label="Adoption Agency"
						value={adoptionAgency}
						onChange={handleAdoptionAgencyChange}
						type="text"
						fullWidth
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							fullWidth
							id="received-date"
							name="received-date"
							label="Received"
							value={receivedDate}
							onChange={handleReceivedDateChange}
							format="MM/dd/yyyy"
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							fullWidth
							id="adopted-date"
							name="adopted-date"
							label="Adopted"
							value={adoptedDate}
							onChange={handleAdoptedDateChange}
							format="MM/dd/yyyy"
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditFoster;
