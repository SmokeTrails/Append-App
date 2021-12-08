import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../hooks/UserContext';
import CustomLink from '../components/CustomLink';
import './Login.css';
import env from '../config.js'
const api_host = env.api_host

export default function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [invalid, setInvalid] = useState("");
	const navigate = useNavigate();
	const user = useContext(UserContext);

	// useEffect(() => {
	// 	if (user !== null) {
	// 		navigate("/");
	// 	}
	// }, [user]);

	function checkCredentials() {
		console.log(`${api_host}/login`)
		const request = new Request(`${api_host}/login`, {
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
			throw new Error();
		})
		.then(json => {
			props.setUser(json);
			if (json.username === "admin") {
				navigate("/admin")
			} else {
				navigate("/")
			}
		})
		.catch(error => {
			console.log(error);
			setInvalid("Your username or password is incorrect.");
		});
	}

	return (
		<div className="Login">
			<div className="header">
				<h1>Welcome to Team 51's Project!</h1>
				<h2>Please login to use our app. Mock login details are provided on our <a href="https://github.com/csc309-fall-2021/team51#readme" target="_blank">ReadME</a>.</h2>
			</div>
			<div className="flexContainer">
				<div className="mainContainer">
					<div className="usernameContainer">
						<label> Username</label>
						<input className="text" type="text" value={username} onChange={event => setUsername(event.target.value)} />
					</div>
					<div className="passwordContainer">
						<label> Password</label>
						<input className="text" type="password" value={password} onChange={event => setPassword(event.target.value)} />
					</div>
					<div className="invalidMessageContainer">
						<label>{invalid}</label>
					</div>
					<div className="submitContainer">
						<button className="button" onClick={checkCredentials}> Login</button>
					</div>
					<CustomLink className="link" to={"/create-account"}>
						<button className="button"> Create a new account</button>
					</CustomLink>
				</div>
			</div>
		</div>
	);
}
