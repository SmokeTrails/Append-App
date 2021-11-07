import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Heading from './LoginHeading.js'
import './Login.css'

export default function Login(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [invalid, setInvalid] = useState("")
	const navigate = useNavigate()
	const activeUser = {
		name: 'Haider',
		username: 'user',
		friendCount: '3',
		clubCount: '5',
		courseCount: '5',
		bio: 'Hello 123',
		interests: '#123',
		year: '3',
		program: 'Computer Science'
	}

	function checkCredentials() {
		if ((username === "admin" && password === "admin") || (username === "user" && password === "user")) {
			props.setUser(activeUser)
			navigate("/")
		}
		else {
			setInvalid("Your username or password is incorrect.")
		}
	}

	return (
		<div className="Login">
			<Heading title={`Login`} />
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
			<Link className="link" to={"/CreateAccount"}>
				<div className="buttonContainer">
					<button className="button"> Create a new account</button>
				</div>
			</Link>
		</div>
	)
}
