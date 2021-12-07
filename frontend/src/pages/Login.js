import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomLink from '../components/CustomLink';
import './Login.css';
import env from '../config.js'
const api_host = env.api_host
export default function Login(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [invalid, setInvalid] = useState("")
	const navigate = useNavigate()

	// Login users needs to be fetched from backend
	const loginUser = {
		name: 'Haider',
		username: 'user',
		friendCount: '5',
		clubCount: '3',
		courseCount: '5',
		bio: 'Hello everyone! I\'m a third year computer science student looking for people to study with.',
		interests: '#coding #AI #anime #gaming',
		year: '3',
		program: 'Computer Science',
		courseCodes: ['CSC309'],
		communityNames: ['Anime', 'WebDevClub']
	}
	const loginAdmin = {
		name: 'Admin',
		username: 'admin',
		friendCount: '0',
		clubCount: '0',
		courseCount: '0',
		bio: 'Here to moderate all users!',
		interests: 'Being an admin',
		year: '4',
		program: 'None',
		courseCodes: [],
		communityNames: []
	}

	function checkCredentials() {
		let isLoggedIn = false
		const request = new Request(`${api_host}/api/login`, {
			method: "post",
			body: JSON.stringify({username: username, password: password}),
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			}
		});
		fetch(request)
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
			})
			.then(json => {
				if (json.currentUser !== undefined) {
					props.setUser(loginUser);
					navigate("/")
					isLoggedIn = true
				}
				else {
					setInvalid("Your username or password is incorrect.")
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<div className="Login">
			<div className="header">
				<h1>Welcome to Team 51's Project!</h1>
				<h2>Please login to continue</h2>
			</div>
			<div className="usernameContainer">
				<h3> Username: </h3>
				<input className="text" type="text" value={username} onChange={event => setUsername(event.target.value)} />
			</div>
			<div className="passwordContainer">
				<h3> Password: </h3>
				<input className="text" type="password" value={password} onChange={event => setPassword(event.target.value)} />
			</div>
			<div className="invalidMessageContainer">
				<h3>{invalid}</h3>
			</div>
			<div className="submitContainer">
				<button className="button" onClick={checkCredentials}> Login</button>
			</div>
			<CustomLink className="link" to={"/create-account"}>
				<div className="buttonContainer">
					<button className="button"> Create a new account</button>
				</div>
			</CustomLink>
		</div>
	);
}
