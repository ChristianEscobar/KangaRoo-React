import React, { useState } from 'react';
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
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Chip from '@material-ui/core/Chip/Chip';
import Checkbox from '@material-ui/core/Checkbox';

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

const ADD_FOSTER_URL = '/api/v1/fosters/add';

const AddFoster = (props) => {
	const classes = useStyles();
	const [fosterName, setFosterName] = useState('');
	const [receivedDate, setReceivedDate] = useState(Date.now());
	const [adoptedDate, setAdoptedDate] = useState(Date.now());
	const [adoptionAgency, setAdoptionAgency] = useState('');
	const [photoFile, setPhotoFile] = useState('');
	const [cardPhotoURL, setCardPhotoURL] = useState('');
	const [adoptedChecked, setAdoptedChecked] = React.useState(false);

	const handleAdoptedChecked = (event) => {
		setAdoptedChecked(event.target.checked);
	};

	const handleFosterNameChange = (event) => {
		setFosterName(event.target.value);
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

	const handlePhotoChange = (event) => {
		setPhotoFile(event.target.files[0]);
		setCardPhotoURL(URL.createObjectURL(event.target.files[0]));
	};

	const handleSubmit = async (event) => {
		if (event) {
			event.preventDefault();
			if (fosterName && receivedDate && adoptionAgency && photoFile) {
				try {
					let formData = new FormData();
					formData.append('fosterName', fosterName);
					formData.append(
						'receivedDate',
						moment(receivedDate).format('MM/DD/YYYY')
					);
					if (!adoptedChecked) {
						formData.append('adoptedDate', '');
					} else {
						formData.append(
							'adoptedDate',
							moment(adoptedDate).format('MM/DD/YYYY')
						);
					}
					formData.append('adoptionAgency', adoptionAgency);
					formData.append('photo', photoFile);

					await fetch(ADD_FOSTER_URL, {
						method: 'POST',
						body: formData,
					});

					props.setSnackbarVariant('success');
					props.setSnackbarMessage(`${fosterName} has been added`);
					props.setSnackbarOpen(true);
					clearState();
					props.fetchData();
				} catch (err) {
					props.setSnackbarVariant('error');
					props.setSnackbarMessage(err.message);
					props.setSnackbarOpen(true);
				}
			} else {
				props.setSnackbarVariant('error');
				props.setSnackbarMessage('Required information has not been provided.');
				props.setSnackbarOpen(true);
			}
		}
	};

	const clearState = () => {
		setFosterName('');
		setReceivedDate(Date.now());
		setAdoptedDate(Date.now());
		setAdoptionAgency('');
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
					<TextField
						variant="standard"
						margin="normal"
						required
						fullWidth
						id="adoption-agency"
						label="Adoption Agency"
						name="adoption_agency"
						value={adoptionAgency}
						onChange={handleAdoptionAgencyChange}
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
					<Checkbox
						checked={adoptedChecked}
						onChange={handleAdoptedChecked}
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disabled={!adoptedChecked}
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
		</div>
	);
};

export default AddFoster;
