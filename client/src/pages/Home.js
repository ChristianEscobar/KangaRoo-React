import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../components/NavBar/NavBar';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: green,
	},
	status: {
		danger: 'orange',
	},
});

function Home() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<div>
				<NavBar />
			</div>
		</MuiThemeProvider>
	);
}

export default Home;
