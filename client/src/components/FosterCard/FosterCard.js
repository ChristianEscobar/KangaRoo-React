import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { extractLettersForAvatar } from '../../utils/display';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		borderRadius: '25px',
	},
	avatar: {
		backgroundColor: red[500],
	},
	media: {
		height: '100%',
		paddingTop: '56.25%', // 16:9
	},
}));

const FosterCard = (props) => {
	const classes = useStyles();
	return (
		<div>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar}>
							{extractLettersForAvatar(props.foster.fosterName)}
						</Avatar>
					}
					title={
						<Typography variant="h4" color="textPrimary">
							{props.foster.fosterName}
						</Typography>
					}
					subheader={props.foster.adoptionAgency}
				/>
				<CardMedia
					className={classes.media}
					image={props.foster.signedURL}
					title="Foster photo"
				/>
				<CardContent>
					<List>
						<ListItemText>Received: {props.foster.receivedDate}</ListItemText>
						<ListItemText>Adopted: {props.foster.adoptedDate}</ListItemText>
					</List>
					<Divider variant="middle" />
					<Typography variant="body2">{props.foster.comments}</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default FosterCard;
