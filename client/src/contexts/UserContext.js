import { createContext } from 'react';

export const UserContext = createContext(null);

// import React, { createContext, useState, useEffect } from 'react';

// const AUTH_URL = '/api/v1/auth/user';
// const context = createContext(null);

// const AuthProvider = ({ children }) => {
// 	const [user, setUser] = useState({});

// 	const updateAuth = async () => {
// 		try {
// 			console.log('in updateauth');
// 			const res = await fetch(AUTH_URL);
// 			const jsonRes = await res.json();
// 			setUser(jsonRes);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		console.log('in UserProvider');
// 		fetch(AUTH_URL)
// 			.then((res) => res.json())
// 			.then((res) => setUser(res))
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}, []);

// 	const value = {
// 		user,
// 		updateAuth,
// 	};

// 	return <context.Provider value={value}>{children}</context.Provider>;
// };

// AuthProvider.context = context;

// export default AuthProvider;
