import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import AddFoster from './components/AddFoster/AddFoster';
import Admin from './components/Admin/Admin';
import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: green,
	},
	status: {
		danger: 'orange',
	},
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<div>
					<NavBar />
					<br />
					<Admin />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
