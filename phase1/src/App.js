import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomLink from './components/CustomLink';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import Login from './pages/Login'
import Admin from './pages/Admin'
import './App.css';

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/Login" element={<Login setLoggedIn={setLoggedIn}/>} />
				<Route path="/" element={<RequireAuth isLoggedIn={isLoggedIn}><Layout /></RequireAuth>}>
					<Route index element={<Home />} />
					<Route path="friends" element={<Friends />} />
					<Route path="user/:username" element={<UserProfile />} />
					<Route path="friends" element={<Friends />} />
					<Route path="admin" element={<Admin />} />
				</Route>
				<Route path="*" element={<MissingPage />} />
			</Routes>
		</BrowserRouter>
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
