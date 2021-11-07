import {
	useNavigate
} from "react-router-dom";
import React, { useState } from 'react';
import './Login.css'
import Heading from './LoginHeading.js'


export default function Login(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [invalid, setInvalid] = useState("")
	const navigate = useNavigate()

	function checkCredentials() {
		if (props.type === "Admin" && username === "admin" && password === "admin") {
			props.setLoggedIn(true)
			navigate("/")
		}
		else if (props.type === "Student" && username === "user" && password === "user") {
			props.setLoggedIn(true)
			navigate("/")
		}
		else {
			setInvalid("Your username or password is incorrect.")
		}
	}

  return (
    <div className="Login">
      <Heading title={`Sign in to your ${props.type} account`} />
          <div className="usernameContainer">
            <h3> Username: </h3>
            <input className="text" type="text" value={username} onChange={event => setUsername(event.target.value)}/>
          </div>
          <div className="passwordContainer">
            <h3> Password: </h3>
            <input className="text" type="text" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
					<div className="invalidMessageContainer">
						<h3>{invalid}</h3>
					</div>
          <div className="submitContainer">
            <button className="button" onClick={checkCredentials}> Login</button>
          </div>
    </div>
  )
}
