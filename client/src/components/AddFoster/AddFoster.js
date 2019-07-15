import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button/Button';
import Popover from '@material-ui/core/Popover/Popover';
import Typography from '@material-ui/core/Typography/Typography';
import Input from '@material-ui/core/Input/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper/SnackbarContentWrapper';

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

const AddFoster = () => {
	const classes = useStyles();
	const [fosterName, setFosterName] = React.useState('');
	const [receivedDate, setReceivedDate] = React.useState(Date.now());
	const [adoptedDate, setAdoptedDate] = React.useState(Date.now());
	const [fromAgency, setFromAgency] = React.useState('');
	const [photo, setPhoto] = React.useState('');
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarVariant, setSnackbarVariant] = React.useState('');
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	const handleFosterNameChange = event => {
		setFosterName(event.target.value);
	};

	const handleReceivedDateChange = date => {
		setReceivedDate(date);
	};

	const handleAdoptedDateChange = date => {
		setAdoptedDate(date);
	};

	const handleFromAgencyChange = event => {
		setFromAgency(event.target.value);
	};

	const handlePhotoChange = event => {
		setPhoto(event.target.files[0]);
	};

	const handleSubmit = async event => {
		if (event) {
			if (fosterName && receivedDate && fromAgency && photo) {
				try {
					event.preventDefault();
					let formData = new FormData();
					formData.append('fosterName', fosterName);
					formData.append('receivedDate', receivedDate);
					formData.append('adoptedDate', adoptedDate);
					formData.append('fromAgency', fromAgency);
					formData.append('photo', photo);

					await fetch('/api/v1/fosters/add', {
						method: 'POST',
						body: formData
					});

					setSnackbarVariant('success');
					setSnackbarMessage('Successfully added new foster!');
					setSnackbarOpen(true);
				} catch (err) {
					console.log(err);
				}
			} else {
				setAnchorEl(event.currentTarget);
			}
		}
	};

	const popOverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	function handleSnackbarClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	}

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<form>
					<TextField
						variant="standard"
						margin="normal"
						required
						fullWidth
						id="foster-name"
						label="Foster Name"
						name="foster-name"
						value={fosterName}
						onChange={handleFosterNameChange}
						autoFocus
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							fullWidth
							id="received-date"
							name="received-date"
							label="Received"
							value={receivedDate}
							required
							onChange={handleReceivedDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
					</MuiPickersUtilsProvider>
					<TextField
						variant="standard"
						margin="normal"
						required
						fullWidth
						id="from-agency"
						label="Agency"
						name="from_agency"
						value={fromAgency}
						onChange={handleFromAgencyChange}
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							fullWidth
							id="adopted-date"
							name="adopted-date"
							label="Adopted"
							value={adoptedDate}
							onChange={handleAdoptedDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
					</MuiPickersUtilsProvider>
					<Button variant="contained" color="primary" component="label">
						<Input
							type="file"
							id="foster-photo"
							name="foster-photo"
							style={{ display: 'none' }}
							onChange={handlePhotoChange}
						/>
						Upload Photo
					</Button>
					<br />
					<br />
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Add Foster
					</Button>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={popOverClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center'
						}}
					>
						<Typography className={classes.typography}>
							Required information has not been provided.
						</Typography>
					</Popover>
				</form>
			</Container>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<SnackbarContentWrapper
					onClose={handleSnackbarClose}
					variant={snackbarVariant}
					message={snackbarMessage}
				/>
			</Snackbar>
		</div>
	);
};

export default AddFoster;
