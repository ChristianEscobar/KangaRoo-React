import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input/Input';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

const AddFoster = () => {
	const [receivedDate, setReceivedDate] = React.useState(Date.now());
	const [adoptedDate, setAdoptedDate] = React.useState(Date.now());

	function handleReceivedDateChange(date) {
		setReceivedDate(date);
	}

	function handleAdoptedDateChange(date) {
		setAdoptedDate(date);
	}

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<Card raised="true">
					<CardActionArea>
						<CardContent>
							<form>
								<TextField
									variant="standard"
									margin="normal"
									required
									fullWidth
									id="foster_name"
									label="Foster Name"
									name="Foster Name"
									autoFocus
								/>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										margin="normal"
										fullWidth
										id="mui-pickers-date"
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
									id="from"
									label="From Agency"
									name="From"
								/>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										margin="normal"
										fullWidth
										id="mui-pickers-date"
										label="Adopted"
										value={adoptedDate}
										onChange={handleAdoptedDateChange}
										KeyboardButtonProps={{
											'aria-label': 'change date'
										}}
									/>
								</MuiPickersUtilsProvider>
								<Input type="file" />
							</form>
						</CardContent>
					</CardActionArea>
				</Card>
			</Container>
		</div>
	);
};

export default AddFoster;
