import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import SignIn from './components/SignIn/SignIn';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={SignIn} />
					<Route path="/admin" component={Admin} test="hi" />
				</Switch>
			</Router>
		);
	}
}

export default App;
