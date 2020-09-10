import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItemText from '@material-ui/core/ListItem/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	avatar: {
		backgroundColor: red[500],
	},
	typography: {
		padding: theme.spacing(2),
	},
	card: {
		maxWidth: 320,
	},
	media: {
		height: '100%',
		paddingTop: '56.25%', // 16:9
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
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="foster" className={classes.avatar}>
						{props.fosterName[0]}
					</Avatar>
				}
				title={props.fosterName}
			/>
			<CardMedia
				className={classes.media}
				image={props.cardPhotoURL}
				title="Foster photo"
			/>
			<CardContent>
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
			</CardContent>
			<CardActions disableSpacing></CardActions>
		</Card>
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
