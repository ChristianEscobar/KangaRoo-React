import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

const NavBar = function () {
	const classes = useStyles();

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<a className="navbar-brand" href="/">
							KangaRoo
						</a>
					</Typography>
					<Link className="btn menu-btn" to="/" title="Home">
						Home
					</Link>
					<Link className="btn menu-btn" to="/about" title="About">
						About
					</Link>
					<Link className="btn menu-btn" to="/fosters" title="Fosters">
						Fosters
					</Link>
					<Link
						className="btn menu-btn"
						to="/publications"
						title="Publications"
					>
						Publications
					</Link>
					<Link className="btn menu-btn" to="/adopt" title="Adopt">
						Adopt
					</Link>
				</Toolbar>
			</AppBar>
			<br />
			<br />
		</div>
	);
};

export default NavBar;
