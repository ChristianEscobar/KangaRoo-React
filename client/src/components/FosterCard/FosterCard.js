import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItemText from '@material-ui/core/ListItem/ListItem';
import { makeStyles } from '@material-ui/core/styles';

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
	list: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const FosterCard = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Card className={classes.card}>
				<CardMedia className={classes.cardMedia} image={props.cardPhotoURL} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.fosterName}
					</Typography>
					<div>
						<Typography variant="body2" color="textSecondary" component="p">
							<List>
								<ListItemText>Adoption Agency: {props.agency}</ListItemText>
								<ListItemText>Received: {props.received}</ListItemText>
								<ListItemText>Adopted: {props.adopted}</ListItemText>
								<ListItemText>Facebook: {props.facebook}</ListItemText>
								<ListItemText>Instagram: {props.instagram}</ListItemText>
								<ListItemText>Comments: {props.comments}</ListItemText>
							</List>
						</Typography>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

FosterCard.propTypes = {
	cardPhotoURL: PropTypes.string.isRequired,
	fosterName: PropTypes.string.isRequired,
	received: PropTypes.string.isRequired,
	agency: PropTypes.string.isRequired,
	adopted: PropTypes.string.isRequired,
};
export default FosterCard;
