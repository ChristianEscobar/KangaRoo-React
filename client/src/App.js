import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Admin from './pages/Admin';

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
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/admin" component={Admin} />
				</Switch>
				{/* <MuiThemeProvider theme={theme}>
					<CssBaseline />
					<div>
						<NavBar />
						<br />
						<Admin />
					</div>
				</MuiThemeProvider> */}
			</Router>
		);
	}
}

export default App;
