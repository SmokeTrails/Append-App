import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from './hooks/UserContext'
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import CommunityPage from './pages/CommunityPage';
import CommunityPost from './pages/CommunityPost';
import Login from './pages/Login'
import Admin from './pages/Admin'
import MissingPage from './pages/MissingPage'
import CreateAccount from './pages/CreateAccount'
import SearchResults from './pages/SearchResults'
import CreateCommunity from './pages/CreateCommunity'
import './App.css';
import env from './config.js'
const api_host = env.api_host

function RequireAuth(props) {
	if (!props.user) {
		return <Navigate to="/login" />
	}
	return props.children;
}

export default function App() {
	const [user, setUser] = useState(() => {
		const user = localStorage.getItem("user");
			if (user !== 'undefined') {
				return JSON.parse(user);
			} else {
				return null
			}
	});

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		fetch(`${api_host}/check-session`)
		.then(res => {
			console.log("The status is", res.status)
			if (res.status === 200) {
					return res.json();
			}
			if (res.status === 401) {
					setUser(null);
			}
		})
		.then(json => {
			if (json) {
				setUser(json);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}, []);

	return (
		<UserProvider value={user}>
			<BrowserRouter>
				<Routes>
					<Route path="/create-account" element={<CreateAccount />} />
					<Route path="/login" element={<Login setUser={setUser} />} />
					<Route path="/" element={<RequireAuth user={user}><Layout setUser={setUser} /></RequireAuth>}>
						<Route index element={<Home />} />
						<Route path="friends" element={<Friends />} />
						<Route path="user/:username" element={<UserProfile />} />
						<Route path="search/:query" element={<SearchResults />} />
						
						{/* Hardcoded communities */}
						<Route path="community/create" element={<CreateCommunity />} />
						
						<Route path="community/:community" element={<CommunityPage />} />
						<Route path="community/:community/:thread" element={<CommunityPost />} />
						<Route path="friends" element={<Friends />} />
						<Route path="admin" element={<Admin />} />
					</Route>
					<Route path="*" element={<MissingPage />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
