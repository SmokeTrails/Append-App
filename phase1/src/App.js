import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from './hooks/UserContext'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login'
import Admin from './pages/Admin'
import MissingPage from './pages/MissingPage'
import './App.css';

function RequireAuth(props) {
	if (!props.isLoggedIn) {
		return <Navigate to="/Login" />
	}

	return props.children;
}

export default function App() {
	const [user, setUser] = useState(() => {
		const user = localStorage.getItem("user");
		const storedUser = JSON.parse(user);
		return storedUser || null;
	});

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	return (
		<UserProvider value={user}>
			<BrowserRouter>
				<Routes>
					<Route path="/Login" element={<Login setUser={setUser} />} />
					<Route path="/" element={<RequireAuth isLoggedIn={user != null}><Layout setUser={setUser} /></RequireAuth>}>
						<Route index element={<Home />} />
						<Route path="friends" element={<Friends />} />
						<Route path="user/:username" element={<UserProfile />} />
						<Route path="community/:community" element={<CommunityPage />} />
						<Route path="friends" element={<Friends />} />
						<Route path="admin" element={<Admin />} />
					</Route>
					<Route path="*" element={<MissingPage />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
