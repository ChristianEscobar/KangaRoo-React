import React, { useState, useEffect, useRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import NavBar from '../components/NavBar/NavBar';
import FosterCard from '../components/FosterCard/FosterCard';

const GET_FOSTERS_URL = '/api/v1/fosters';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 500,
		height: 450,
		float: 'left',
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	fosterCard: {
		float: 'right',
	},
}));

const Fosters = () => {
	const [fosterData, setFosterData] = useState([]);
	const [loading, setLoading] = useState(true);

	const componentIsMounted = useRef(true);
	const classes = useStyles();

	useEffect(() => {
		// each useEffect can return a cleanup function
		return () => {
			componentIsMounted.current = false;
		};
	}, []);

	useEffect(() => {
		async function getFosters() {
			await fetchData();
		}
		if (componentIsMounted.current) {
			getFosters();
		}
	}, []);

	async function fetchData() {
		setLoading(true);
		const response = await fetch(GET_FOSTERS_URL);
		setFosterData(await response.json());
		setLoading(false);
	}

	if (loading) {
		return (
			<div>
				<NavBar />
				<Alert variant="filled" severity="info">
					Loading...
				</Alert>
			</div>
		);
	}

	return (
		<div>
			<NavBar />
			<div className={classes.root}>
				<Grid container spacing={1} className={classes.fosterCard}>
					{fosterData.docs.map((foster) => (
						<Grid item xs={3}>
							<FosterCard foster={foster} />
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default Fosters;
