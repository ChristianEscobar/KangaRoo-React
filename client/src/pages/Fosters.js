import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
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
				<GridList cellHeight={180} className={classes.gridList}>
					{fosterData.docs.map((foster) => (
						<GridListTile key={foster.signedURL}>
							<img src={foster.signedURL} alt={foster.fosterName} />
							<GridListTileBar
								title={foster.fosterName}
								actionIcon={
									<IconButton
										aria-label={`info about ${foster.fosterName}`}
										className={classes.icon}
										onClick={() => console.log('info clicked')}
									>
										<InfoIcon onClick={() => console.log('info clicked 2')} />
									</IconButton>
								}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		</div>
	);
};

export default Fosters;
