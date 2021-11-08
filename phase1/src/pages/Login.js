import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomLink from '../components/CustomLink';
import './Login.css'

export default function Login(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [invalid, setInvalid] = useState("")
	const navigate = useNavigate()

	// Login user needs to be fetched from backend
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
		if (username === "admin" && password === "admin") {
			props.setUser(loginAdmin)
			navigate("/admin")
		}
		else if(username === "user" && password === "user") {
			props.setUser(loginUser)
			navigate("/")
		}
		else {
			setInvalid("Your username or password is incorrect.")
		}
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
				<input className="text" type="text" value={password} onChange={event => setPassword(event.target.value)} />
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
	)
}
