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
import './App.css';
import env from './config.js'
const api_host = env.api_host

function RequireAuth(props) {
	console.log('User is: ')
	console.log(props.user)
	
	if (!props.user) {
		console.log("I got here")
		return <Navigate to="/login" />
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

	useEffect(() => {
		console.log('check-session')
		async function fetchMyAPI() {
			try {
				const res = await fetch(`${api_host}/check-session`);
				console.log(res);
				if (res.status === 200) {
					// setUser(data.currentUser)
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchMyAPI()
	}, []);

	/*
	useEffect(() => {
		// Check if user is logged in in the backend
		// if (!env.use_frontend_test_user) {
		async function fetchMyAPI() {
			try {
				const res = await fetch(`${api_host}/check-session`);
				if (res.status === 200) {
					setUser(data.currentUser)
				}
				if (res.status === 401) {
					
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchMyAPI()

		fetch(`${api_host}/check-session`)
		.then(res => {
			console.log(res)
			if (res.status === 200) {
				return res.json()
			}
		})
		.then(data => {
			console.log(data)
			if (data && data.currentUser) {
				setUser(data.currentUser)
			}
		})
		.catch(error => {
			console.log('yo')
			console.log(error)
		})
		// } else {
		// 	setUser(env.user)
		// }
		// console.log("User: ", user)
	}, []);
	*/

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
