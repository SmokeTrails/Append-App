import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomLink from './components/CustomLink';
import { UserProvider } from './hooks/UserContext'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.css';

export default function App() {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
		<UserProvider value={user}>
			<BrowserRouter>
				<Routes>
					<Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser}/>} />
					<Route path="/" element={<RequireAuth isLoggedIn={isLoggedIn}><Layout /></RequireAuth>}>
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

function RequireAuth(props) {
	if (!props.isLoggedIn) {
		return <Navigate to="/Login" />
	}

	return props.children;
}

function MissingPage() {
	return (
		<div>
			<h1>404</h1>
			<CustomLink to="/">Go to the home page</CustomLink>
		</div>
	);
}
