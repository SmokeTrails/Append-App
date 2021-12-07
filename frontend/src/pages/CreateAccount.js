import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomLink from '../components/CustomLink';
import Heading from '../components/LoginHeading.js';
import './CreateAccount.css';
import env from '../config.js'
const api_host = env.api_host

export default function CreateAccount() {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name: '',
		password: '',
		username: '',
		friendCount: '0',
		clubCount: '0',
		courseCount: '',
		bio: '',
		interests: '',
		year: '',
		program: '',
		courseCodes: [''],
		communityNames: ['']
	})
	const [duplicateUsernames, setDuplicateUsername] = useState("")
	const [successful, setSuccessful] = useState("")

	function successfulCreation() {
		if (user.username === "" || user.password === "" || user.name === "" || user.bio === "" || user.interests === "") {
			setSuccessful("Please complete all fields to create your account.")
		}
		else {
			// User needs to be uploaded to backend
			const request = new Request(`${api_host}/users`, {
				method: "post",
				body: JSON.stringify({
					name: user.name,
					username: user.username,
					password: user.password,
					bio: user.bio,
					interests: user.interests,
					year: user.year,
					program: user.program
				}),
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json"
				}
			});
			fetch(request)
	        .then(res => {
	            if (res.status === 200) {
								return res.json()
	            }
	        })
					.then(json => {
							console.log(json)
							if (json.message === undefined) {
								setSuccessful("Your account was created successfuly! Redirecting you to login...")
								setTimeout(() => navigate("/Login"), 2000)
							}
							else {
								setDuplicateUsername("This username is taken. Try another.")
							}
					})
	        .catch(error => {
	            console.log(error);
	        });
		}
	}

	function handleChange(event) {
			setUser({
				...user, [event.target.name]: event.target.value
			})
	}

	/*
	function addCourse() {
		setUser({
			...user, courseCodes: [...user.courseCodes, ""]
		})
	}

	function removeCourse(i) {
		const courses = user.courseCodes
		courses.splice(i, 1)
		setUser({
			...user, courseCodes: courses
		})

	}

	function changeCourse(event, i) {
		const courses = user.courseCodes
		courses[i] = event.target.value
		setUser({
			...user, courseCodes: courses
		})
	}*/

	return (
		<div className="accountForm">
			<Heading title="Create a new account" />
			<div className="Container">
				<h3> Full Name </h3>
				<input className="text" type="text" name="name" value={user.name} onChange={handleChange} />
			</div>
			<div className="Container">
				<h3> Username </h3>
				<input className={duplicateUsernames ? 'redText': 'text'} type="text" name="username" value={user.username} onChange={handleChange} />
			</div>
			<h3> {duplicateUsernames} </h3>
			<div className="Container">
				<h3> Password </h3>
				<input className="text" type="password" name="password" value={user.password} onChange={handleChange} />
			</div>
			<div className="Container">
				<h3> Program </h3>
				<input className={"text"} type="text" name="program" value={user.program} onChange={handleChange} />
				<h3> Year </h3>
				<input className="text" type="text" name="year" value={user.year} onChange={handleChange} />
			</div>
			<div className="Container">
				<h3> Bio </h3>
				<textarea className="bioText" type="text" name="bio" value={user.bio} onChange={handleChange} />
			</div>
			<div className="Container">
				<h3> Hobbies/Interests </h3>
				<textarea className="bioText" type="text" name="interests" value={user.interests} onChange={handleChange} />
			</div>
			{/*
			<div className="coursesContainer">
				<h3> Courses you are taking this semester </h3>
				<CourseForm user={user} setUser={setUser} removeCourse={removeCourse} changeCourse={changeCourse} />
				<button className="addButton" onClick={addCourse}> Add a course
				</button>
			</div>*/}
			<div className="Container last">
				<h3> {successful} </h3>
				<button className="submitButton" onClick={successfulCreation}> Create Account</button>
				<CustomLink className="link" to={"/login"}>
					<div className="buttonContainer">
						<button className="submitButton"> Back to Login</button>
					</div>
				</CustomLink>
			</div>
		</div>
	)
}

/*
function CourseForm(props) {
	return (
		props.user.courseCodes.map((val, i) => {
			return (
				<div className="courseContainer" key={i} >
					<input className="courseText" type="text" value={props.user.courseCodes[i]} onChange={(event) => props.changeCourse(event, i)} />
					<button className="removeButton" onClick={() => props.removeCourse(i)}> Remove </button>
				</div>
			)
		})
	)
}
*/
