import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

const NavBar = function() {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Kanga Roo</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
