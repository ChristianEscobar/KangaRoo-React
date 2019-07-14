import React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button/Button';
import Input from '@material-ui/core/Input/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

const AddFoster = () => {
	const [fosterName, setFosterName] = React.useState('');
	const [receivedDate, setReceivedDate] = React.useState(Date.now());
	const [adoptedDate, setAdoptedDate] = React.useState(Date.now());
	const [fromAgency, setFromAgency] = React.useState('');
	const [photo, setPhoto] = React.useState('');

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
			try {
				event.preventDefault();
				let formData = new FormData();
				formData.append('fosterName', fosterName);
				formData.append('receivedDate', receivedDate);
				formData.append('adoptedDate', adoptedDate);
				formData.append('fromAgency', fromAgency);
				formData.append('photo', photo);

				const res = await fetch('/api/v1/fosters/add', {
					method: 'POST',
					body: formData
				});

				console.log(await res.text());
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<Card>
					<CardActionArea>
						<CardContent>
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
									label="From Agency"
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
										required
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
							</form>
						</CardContent>
					</CardActionArea>
				</Card>
			</Container>
		</div>
	);
};

export default AddFoster;
