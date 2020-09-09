import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const AboutText = ({ text }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<Typography component="p">
				<p>{text}</p>
			</Typography>
		</Paper>
	);
};

export default AboutText;
