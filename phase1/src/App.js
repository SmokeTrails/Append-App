import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, {useState} from 'react';
import CustomLink from './components/CustomLink';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Friends from './pages/Friends';
import UserProfile from './pages/Profile';
import LoginHome from './pages/LoginHome';
import Login from './pages/Login'
import './App.css';

export default function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/LoginHome" element={<LoginHome />} />
				<Route path="/StudentLogin" element={<Login type="Student" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>} />
				<Route path="/AdminLogin" element={<Login type="Admin"/>} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
				<PrivateRoute path="/" element={<Layout />} isLoggedIn={false}>
				  <PrivateRoute index element={<Home />} isLoggedIn={false} />
					<PrivateRoute path="friends" element={<Friends />} isLoggedIn={false}/ >
					<PrivateRoute path="user/:username" element={<UserProfile />} isLoggedIn={false} />
				</PrivateRoute>

				<Route path="*" element={<MissingPage />} />
			</Routes>
		</BrowserRouter>
	);
}

function PrivateRoute(props) {
	if (props.isLoggedIn) {
		console.log(props.isLoggedIn)
		return <Route path={props.path} element={props.element} />
	}
	else {
		return <Navigate to="/LoginHome" />
	}
}

function MissingPage() {
	return (
		<div>
			<h1>404</h1>
			<CustomLink to="/">Go to the home page</CustomLink>
		</div>
	);
}
