import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import Input from '@material-ui/core/Input/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper/SnackbarContentWrapper';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Chip from '@material-ui/core/Chip/Chip';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
	card: {
		maxWidth: 320,
	},
	cardMedia: {
		height: 240,
	},
}));

const AddFoster = () => {
	const classes = useStyles();
	const [fosterName, setFosterName] = React.useState('');
	const [receivedDate, setReceivedDate] = React.useState(Date.now());
	const [adoptedDate, setAdoptedDate] = React.useState(Date.now());
	const [fromAgency, setFromAgency] = React.useState('');
	const [photoFile, setPhotoFile] = React.useState('');
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarVariant, setSnackbarVariant] = React.useState('');
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [cardPhotoURL, setCardPhotoURL] = React.useState('');

	const handleFosterNameChange = (event) => {
		setFosterName(event.target.value);
	};

	const handleReceivedDateChange = (date) => {
		setReceivedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleAdoptedDateChange = (date) => {
		setAdoptedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleFromAgencyChange = (event) => {
		setFromAgency(event.target.value);
	};

	const handlePhotoChange = (event) => {
		setPhotoFile(event.target.files[0]);
		setCardPhotoURL(URL.createObjectURL(event.target.files[0]));
	};

	const handleSubmit = async (event) => {
		if (event) {
			event.preventDefault();
			if (fosterName && receivedDate && fromAgency && photoFile) {
				try {
					let formData = new FormData();
					formData.append('fosterName', fosterName);
					formData.append(
						'receivedDate',
						moment(receivedDate).format('MM/DD/YYYY')
					);
					formData.append(
						'adoptedDate',
						moment(adoptedDate).format('MM/DD/YYYY')
					);
					formData.append('fromAgency', fromAgency);
					formData.append('photo', photoFile);

					await fetch('/api/v1/fosters/add', {
						method: 'POST',
						body: formData,
					});

					setSnackbarVariant('success');
					setSnackbarMessage(`Successfully added ${fosterName}!`);
					setSnackbarOpen(true);
					clearState();
				} catch (err) {
					setSnackbarVariant('error');
					setSnackbarMessage(err.message);
					setSnackbarOpen(true);
				}
			} else {
				setSnackbarVariant('error');
				setSnackbarMessage('Required information has not been provided.');
				setSnackbarOpen(true);
			}
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	const clearState = () => {
		setFosterName('');
		setReceivedDate(Date.now());
		setAdoptedDate(Date.now());
		setFromAgency('');
		setPhotoFile('');
		setCardPhotoURL('');
	};

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<form>
					<Card className={classes.card}>
						<CardMedia className={classes.cardMedia} image={cardPhotoURL} />
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="div">
								<Chip
									size="small"
									label="Image size must be 320x240"
									color="primary"
								/>
							</Typography>
						</CardContent>
					</Card>
					<br />
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
							format="MM/dd/yyyy"
							required
							onChange={handleReceivedDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
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
							format="MM/dd/yyyy"
							onChange={handleAdoptedDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
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
				</form>
			</Container>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
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
