import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Facebook from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: '5%',
	},
	card: {
		maxWidth: 750,
		margin: 'auto',
	},
	media: {
		height: 365,
		backgroundSize: 'cover',
	},
	cardActions: {
		justifyContent: 'center',
	},
}));

const FosterForm = (props) => {
	const [cardPhotoFile, setCardPhotoFile] = useState('');
	const [cardPhotoURL, setCardPhotoURL] = useState('');
	const [fosterName, setFosterName] = useState('');
	const [adoptionAgency, setAdoptionAgency] = useState('');
	const [receivedDate, setReceivedDate] = useState(Date.now());
	const [adoptedChecked, setAdoptedChecked] = React.useState(false);
	const [adoptedDate, setAdoptedDate] = useState(Date.now());
	const [facebook, setFacebook] = useState('');
	const [instagram, setInstagram] = useState('');
	const [comments, setComments] = useState('');

	const classes = useStyles();

	const handlePhotoUpload = (event) => {
		setCardPhotoFile(event.target.files[0]);
		setCardPhotoURL(URL.createObjectURL(event.target.files[0]));
	};

	const handleFosterNameChange = (event) => {
		setFosterName(event.target.value);
	};

	const handleAdoptionAgencyChange = (event) => {
		setAdoptionAgency(event.target.value);
	};

	const handleReceivedDateChange = (date) => {
		setReceivedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleAdoptedChecked = (event) => {
		setAdoptedChecked(event.target.checked);
	};

	const handleAdoptedDateChange = (date) => {
		setAdoptedDate(moment(date).format('MM/DD/YYYY'));
	};

	const handleFacebookChange = (event) => {
		setFacebook(event.target.value);
	};

	const handleInstagramChange = (event) => {
		setInstagram(event.target.value);
	};

	const handleCommentsChange = (event) => {
		setComments(event.target.value);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Card className={classes.card}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={cardPhotoURL}
								title="Foster Photo"
							/>
						</CardActionArea>
						<CardActions className={classes.cardActions}>
							<Button
								size="small"
								variant="contained"
								color="primary"
								component="label"
							>
								<Input
									type="file"
									id="foster-photo"
									name="foster-photo"
									style={{ display: 'none' }}
									onChange={handlePhotoUpload}
								/>
								Upload Photo
							</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={12} sm container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
							required
							id="foster-name"
							label="Foster Name"
							name="foster-name"
							value={fosterName}
							onChange={handleFosterNameChange}
							autoFocus
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
							required
							id="adoption-agency"
							label="Adoption Agency"
							name="adoption_agency"
							value={adoptionAgency}
							onChange={handleAdoptionAgencyChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								margin="normal"
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
					</Grid>
					<Grid item container spacing={1} sm alignItems="flex-end">
						<Grid item>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disabled={!adoptedChecked}
									margin="normal"
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
						</Grid>
						<Grid item>
							<Checkbox
								checked={adoptedChecked}
								onChange={handleAdoptedChecked}
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
							required
							id="facebook"
							label="Facebook"
							name="facebook"
							value={facebook}
							onChange={handleFacebookChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Facebook color="primary" />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
							required
							id="instagram"
							label="Instagram"
							name="instagram"
							value={instagram}
							onChange={handleInstagramChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Instagram color="primary" />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							variant="outlined"
							rows="5"
							margin="normal"
							id="comments"
							label="Comments"
							name="comments"
							value={comments}
							onChange={handleCommentsChange}
						/>
					</Grid>
				</Grid>
			</Grid>
		</div>

		// <div className={classes.root}>
		// 	<Grid container spacing={2}>
		// 		<Grid item>
		// 			<ButtonBase>
		// 				<Card className={classes.card}>
		// 					<CardMedia className={classes.cardMedia} image={cardPhotoURL} />
		// 					<CardContent>
		// 						<Typography
		// 							variant="body2"
		// 							color="textSecondary"
		// 							component="div"
		// 						>
		// 							<Chip
		// 								size="small"
		// 								label="Image size must be 320x240"
		// 								color="primary"
		// 							/>
		// 						</Typography>
		// 					</CardContent>
		// 				</Card>
		// 			</ButtonBase>
		// 		</Grid>
		// 		<Grid container item sm>
		// 			<Grid item container spacing={2}>
		// 				<Grid item xs={6}>
		// 					<TextField
		// 						fullWidth
		// 						variant="standard"
		// 						margin="normal"
		// 						required
		// 						id="foster-name"
		// 						label="Foster Name"
		// 						name="foster-name"
		// 						value={fosterName}
		// 						onChange={handleFosterNameChange}
		// 						autoFocus
		// 					/>
		// 				</Grid>
		// 				<Grid item xs={6}>
		// 					<TextField
		// 						fullWidth
		// 						variant="standard"
		// 						margin="normal"
		// 						required
		// 						id="adoption-agency"
		// 						label="Adoption Agency"
		// 						name="adoption_agency"
		// 						value={adoptionAgency}
		// 						onChange={handleAdoptionAgencyChange}
		// 					/>
		// 				</Grid>
		// 				<Grid item container spacing={2}>
		// 					<Grid item>
		// 						<MuiPickersUtilsProvider utils={DateFnsUtils}>
		// 							<KeyboardDatePicker
		// 								margin="normal"
		// 								id="received-date"
		// 								name="received-date"
		// 								label="Received"
		// 								value={receivedDate}
		// 								format="MM/dd/yyyy"
		// 								required
		// 								onChange={handleReceivedDateChange}
		// 								KeyboardButtonProps={{
		// 									'aria-label': 'change date',
		// 								}}
		// 							/>
		// 						</MuiPickersUtilsProvider>
		// 					</Grid>
		// 					<Grid item container spacing={1} alignItems="flex-end">
		// 						<Grid item>
		// 							<MuiPickersUtilsProvider utils={DateFnsUtils}>
		// 								<KeyboardDatePicker
		// 									disabled={!adoptedChecked}
		// 									margin="normal"
		// 									id="adopted-date"
		// 									name="adopted-date"
		// 									label="Adopted"
		// 									value={adoptedDate}
		// 									format="MM/dd/yyyy"
		// 									onChange={handleAdoptedDateChange}
		// 									KeyboardButtonProps={{
		// 										'aria-label': 'change date',
		// 									}}
		// 								/>
		// 							</MuiPickersUtilsProvider>
		// 						</Grid>
		// 						<Grid item>
		// 							<Checkbox
		// 								checked={adoptedChecked}
		// 								onChange={handleAdoptedChecked}
		// 								inputProps={{ 'aria-label': 'primary checkbox' }}
		// 							/>
		// 						</Grid>
		// 					</Grid>
		// 				</Grid>
		// 				<Grid container item spacing={1} alignItems="flex-end">
		// 					<Grid item xs={3}>
		// 						<TextField
		// 							fullWidth
		// 							variant="standard"
		// 							margin="normal"
		// 							required
		// 							id="facebook"
		// 							label="Facebook"
		// 							name="facebook"
		// 							value={facebook}
		// 							onChange={handleFacebookChange}
		// 						/>
		// 					</Grid>
		// 					<Grid item>
		// 						<Facebook color="primary" />
		// 					</Grid>
		// 					<Grid item xs={3}>
		// 						<TextField
		// 							fullWidth
		// 							variant="standard"
		// 							margin="normal"
		// 							required
		// 							id="instagram"
		// 							label="Instagram"
		// 							name="instagram"
		// 							value={instagram}
		// 							onChange={handleInstagramChange}
		// 						/>
		// 					</Grid>
		// 					<Grid item>
		// 						<Instagram color="primary" />
		// 					</Grid>
		// 				</Grid>
		// 			</Grid>
		// 		</Grid>
		// 	</Grid>
		// </div>
	);
};

export default FosterForm;
