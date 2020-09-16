import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import AddFosterActions from '../AddFosterActions/AddFosterActions';
import EditFosterActions from '../EditFosterActions/EditFosterActions';
import PlaceholderImage from '../../images/cat-placeholder-2.png';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '5%',
		display: 'flex',
		flexDirection: 'row',
	},
	cardActions: {
		justifyContent: 'center',
	},
	imageContainer: {
		padding: '10px',
	},
	image: {
		width: '350px',
	},
	formContainer: {
		flexGrow: 1,
	},
}));

const FosterForm = (props) => {
	const [cardPhotoFile, setCardPhotoFile] = useState();
	const [cardPhotoURL, setCardPhotoURL] = useState(
		!props.photoURL || props.photoURL.length === 0
			? PlaceholderImage
			: props.photoURL
	);
	const [fosterName, setFosterName] = useState(
		!props.fosterName || props.fosterName.length === 0 ? '' : props.fosterName
	);
	const [adoptionAgency, setAdoptionAgency] = useState(
		!props.adoptionAgency || props.adoptionAgency.length === 0
			? ''
			: props.adoptionAgency
	);
	const [receivedDate, setReceivedDate] = useState(
		!props.receivedDate || props.receivedDate.length === 0
			? Date.now()
			: props.receivedDate
	);
	const [adoptedDateChecked, setAdoptedDateChecked] = useState(
		!props.adoptedDate || props.adoptedDate.length === 0 ? false : true
	);
	const [adoptedDate, setAdoptedDate] = useState(
		!props.adoptedDate || props.adoptedDate.length === 0
			? Date.now()
			: props.adoptedDate
	);
	const [facebook, setFacebook] = useState(
		!props.facebook || props.facebook.length === 0 ? '' : props.facebook
	);
	const [instagram, setInstagram] = useState(
		!props.instagram || props.instagram.length === 0 ? '' : props.instagram
	);
	const [comments, setComments] = useState(
		!props.comments || props.comments.length === 0 ? '' : props.comments
	);

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

	const handleAdoptedDateChecked = (event) => {
		setAdoptedDateChecked(event.target.checked);
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

	const clearForm = () => {
		setFosterName('');
		setReceivedDate(Date.now());
		setAdoptedDateChecked(false);
		setAdoptedDate(Date.now());
		setAdoptionAgency('');
		setCardPhotoFile('');
		setCardPhotoURL(PlaceholderImage);
		setFacebook('');
		setInstagram('');
		setComments('');
	};

	let formActionButtons;
	let disableFosterName = false;
	if (props.adding) {
		disableFosterName = false;
		formActionButtons = (
			<AddFosterActions
				fosterName={fosterName}
				adoptionAgency={adoptionAgency}
				adoptedDateChecked={adoptedDateChecked}
				receivedDate={receivedDate}
				adoptedDate={adoptedDate}
				photoFile={cardPhotoFile}
				facebook={facebook}
				instagram={instagram}
				comments={comments}
				fetchData={props.fetchData}
				clearForm={clearForm}
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
		);
	} else {
		disableFosterName = true;
		formActionButtons = (
			<EditFosterActions
				docAwsKey={props.docAwsKey}
				imageAwsKey={props.imageAwsKey}
				fosterName={props.fosterName}
				adoptionAgency={adoptionAgency}
				adoptedDateChecked={adoptedDateChecked}
				receivedDate={receivedDate}
				adoptedDate={adoptedDate}
				photoFile={cardPhotoFile}
				facebook={facebook}
				instagram={instagram}
				comments={comments}
				setEdit={props.setEdit}
				fetchData={props.fetchData}
				clearForm={clearForm}
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
		);
	}

	return (
		<div className={classes.root}>
			<Grid container sm spacing={2} className={classes.imageContainer}>
				<Grid container item>
					<Grid item>
						<Card>
							<CardActionArea>
								<div>
									<img src={cardPhotoURL} className={classes.image}></img>
								</div>
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
				</Grid>
			</Grid>

			<Grid container className={classes.formContainer}>
				<Grid container item spacing={3}>
					<Grid item sm={3}>
						<TextField
							disabled={disableFosterName}
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
					<Grid item sm={3}>
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
				</Grid>
				<Grid container item spacing={3}>
					<Grid item sm={3}>
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
									disabled={!adoptedDateChecked}
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
								checked={adoptedDateChecked}
								onChange={handleAdoptedDateChecked}
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item spacing={3}>
					<Grid item sm={3}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
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
					<Grid item sm={3}>
						<TextField
							fullWidth
							variant="standard"
							margin="normal"
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
				</Grid>
				<Grid container item spacing={3}>
					<Grid item sm={6}>
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
				<Grid container item spacing={3} sm={6}>
					<Grid item>{formActionButtons}</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default FosterForm;
