import React, { useState, useMemo } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import SignIn from './components/SignIn/SignIn';
import { UserContext } from './contexts/UserContext';
import './App.css';

function AppRouter() {
	const [user, setUser] = useState(null);

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<Router>
			<UserContext.Provider value={value}>
				<Route path="/login" exact component={SignIn} />
				<Route path="/admin" component={Admin} />
				<Route path="/" exact component={Home} />
			</UserContext.Provider>
		</Router>
	);
}

export default AppRouter;
